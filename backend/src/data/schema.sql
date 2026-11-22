-- ============================================================================
-- CODEPATH DATABASE SCHEMA (PostgreSQL / Supabase)
-- "CODEPATH - FROM ZERO TO PLACEMENT READY"
-- ============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (extends Supabase auth.users or standalone auth)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    full_name VARCHAR(150),
    avatar_url VARCHAR(500),
    role VARCHAR(20) DEFAULT 'student' CHECK (role IN ('student', 'admin', 'mentor')),
    college VARCHAR(255),
    grad_year INT,
    streak INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Learning Paths (Python, Java, C++, DSA Masterclass)
CREATE TABLE IF NOT EXISTS learning_paths (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50) NOT NULL,
    color VARCHAR(30) DEFAULT 'indigo',
    order_index INT DEFAULT 1,
    total_topics INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Topics (Arrays, Strings, Dynamic Programming, etc.)
CREATE TABLE IF NOT EXISTS topics (
    id VARCHAR(50) PRIMARY KEY,
    path_id VARCHAR(50) REFERENCES learning_paths(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    category VARCHAR(50) DEFAULT 'dsa', -- 'language' or 'dsa'
    description TEXT NOT NULL,
    icon VARCHAR(50) NOT NULL,
    order_index INT NOT NULL,
    prerequisites JSONB DEFAULT '[]'::jsonb, -- Array of topic ids
    estimated_hours INT DEFAULT 4,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Lessons (Detailed educational content per topic)
CREATE TABLE IF NOT EXISTS lessons (
    id VARCHAR(50) PRIMARY KEY,
    topic_id VARCHAR(50) REFERENCES topics(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    order_index INT NOT NULL,
    concept_summary TEXT NOT NULL,
    syntax_example TEXT NOT NULL,
    detailed_content TEXT NOT NULL,
    time_complexity VARCHAR(50),
    space_complexity VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Problems (Coding practice challenges)
CREATE TABLE IF NOT EXISTS problems (
    id VARCHAR(50) PRIMARY KEY,
    topic_id VARCHAR(50) REFERENCES topics(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('Beginner', 'Easy', 'Medium', 'Hard')),
    description TEXT NOT NULL,
    constraints TEXT NOT NULL,
    starter_code JSONB NOT NULL, -- { "python": "...", "java": "...", "cpp": "..." }
    solution_explanation TEXT NOT NULL,
    hints JSONB DEFAULT '[]'::jsonb,
    topic_tags JSONB DEFAULT '[]'::jsonb,
    acceptance_rate NUMERIC(5,2) DEFAULT 75.0,
    likes INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Test Cases (Sample and Hidden)
CREATE TABLE IF NOT EXISTS test_cases (
    id VARCHAR(50) PRIMARY KEY,
    problem_id VARCHAR(50) REFERENCES problems(id) ON DELETE CASCADE,
    input TEXT NOT NULL,
    expected_output TEXT NOT NULL,
    is_sample BOOLEAN DEFAULT TRUE,
    explanation TEXT,
    order_index INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Submissions (User code attempts and execution results)
CREATE TABLE IF NOT EXISTS submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    problem_id VARCHAR(50) REFERENCES problems(id) ON DELETE CASCADE,
    language VARCHAR(30) NOT NULL CHECK (language IN ('python', 'java', 'cpp', 'javascript')),
    code TEXT NOT NULL,
    status VARCHAR(30) NOT NULL, -- 'Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Runtime Error', 'Compile Error'
    execution_time_ms NUMERIC(8,2) DEFAULT 0,
    memory_kb NUMERIC(8,2) DEFAULT 0,
    passed_test_cases INT DEFAULT 0,
    total_test_cases INT DEFAULT 0,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Topic Progress (Topic completion tracking)
CREATE TABLE IF NOT EXISTS topic_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    topic_id VARCHAR(50) REFERENCES topics(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, topic_id)
);

-- 9. User Progress (Aggregated statistics for student dashboard)
CREATE TABLE IF NOT EXISTS user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
    total_solved INT DEFAULT 0,
    easy_solved INT DEFAULT 0,
    medium_solved INT DEFAULT 0,
    hard_solved INT DEFAULT 0,
    current_streak INT DEFAULT 0,
    last_active_date DATE DEFAULT CURRENT_DATE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Bookmarks (Saved problems)
CREATE TABLE IF NOT EXISTS bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    problem_id VARCHAR(50) REFERENCES problems(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, problem_id)
);

-- ============================================================================
-- INDEXES FOR HIGH QUERY PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_topics_path ON topics(path_id);
CREATE INDEX IF NOT EXISTS idx_lessons_topic ON lessons(topic_id);
CREATE INDEX IF NOT EXISTS idx_problems_topic ON problems(topic_id);
CREATE INDEX IF NOT EXISTS idx_problems_difficulty ON problems(difficulty);
CREATE INDEX IF NOT EXISTS idx_test_cases_problem ON test_cases(problem_id);
CREATE INDEX IF NOT EXISTS idx_submissions_user ON submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_problem ON submissions(problem_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_topic_progress_user ON topic_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON bookmarks(user_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES FOR SUPABASE
-- ============================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE topic_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Read public data (learning paths, topics, lessons, problems, test cases)
CREATE POLICY "Public read learning paths" ON learning_paths FOR SELECT USING (true);
CREATE POLICY "Public read topics" ON topics FOR SELECT USING (true);
CREATE POLICY "Public read lessons" ON lessons FOR SELECT USING (true);
CREATE POLICY "Public read problems" ON problems FOR SELECT USING (true);
CREATE POLICY "Public read sample test cases" ON test_cases FOR SELECT USING (is_sample = true);

-- Profiles policies
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Submissions policies
CREATE POLICY "Users can read own submissions" ON submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create submissions" ON submissions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Topic progress policies
CREATE POLICY "Users can view own topic progress" ON topic_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can modify own topic progress" ON topic_progress FOR ALL USING (auth.uid() = user_id);

-- User progress policies
CREATE POLICY "Users can view own progress" ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON user_progress FOR ALL USING (auth.uid() = user_id);
