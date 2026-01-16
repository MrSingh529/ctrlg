-- Add author column to articles
ALTER TABLE articles ADD COLUMN author VARCHAR(100) DEFAULT 'Harpinder Singh';

-- Create categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL,
  description TEXT
);

-- Create article_categories junction table
CREATE TABLE article_categories (
  article_id INTEGER REFERENCES articles(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, category_id)
);

-- Insert default categories
INSERT INTO categories (name, slug, description) VALUES 
  ('AI', 'ai', 'Artificial Intelligence and Machine Learning'),
  ('Excel', 'excel', 'Microsoft Excel tips and formulas'),
  ('Automation', 'automation', 'Workflow automation and tools'),
  ('Terraform', 'terraform', 'Infrastructure as Code with Terraform'),
  ('Git', 'git', 'Version control and Git workflows'),
  ('Technology', 'technology', 'General technology insights');