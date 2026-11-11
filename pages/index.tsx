import type { NextPage } from "next";

const tools = [
  { name: "Bulk Email Verify", url: "/bulk-email-verify.html", description: "Verify multiple email addresses at once" },
  { name: "Company Contact Scraper", url: "/company-contact-scraper.html", description: "Extract contact information from websites" },
  { name: "Company Contact Scraper 2", url: "/company-contact-scraper-2.html", description: "Advanced contact extraction tool" },
  { name: "Email Verification", url: "/email-verification.html", description: "Check email validity and deliverability" },
  { name: "GST Verify", url: "/gst-verify.html", description: "Verify Indian GST numbers" },
  { name: "Social Finder", url: "/social-finder.html", description: "Find social media profiles" },
  { name: "WhatsApp PP Finder", url: "/whatsapp-pp-finder.html", description: "Find WhatsApp profile pictures" },
  { name: "Women Safety Project", url: "/women-safety-project.html", description: "Women's safety analysis tools" }
];

const Home: NextPage = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#e2e8f0', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '4rem', padding: '3rem 0' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem', background: 'linear-gradient(135deg, #60a5fa, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            24KGAL Tools
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
            AI Marketing, WhatsApp & OSINT Intelligence Suite
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '10px', height: '10px', backgroundColor: '#10b981', borderRadius: '50%' }}></span>
              <span style={{ fontSize: '0.9rem' }}>System Status: Online</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '10px', height: '10px', backgroundColor: '#10b981', borderRadius: '50%' }}></span>
              <span style={{ fontSize: '0.9rem' }}>RapidAPI: Active</span>
            </div>
          </div>
        </header>

        {/* Tools Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          {tools.map((tool, index) => (
            <div key={index} style={{ 
              backgroundColor: '#1e293b', 
              borderRadius: '12px', 
              padding: '2rem', 
              border: '1px solid #334155',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#f1f5f9' }}>
                {tool.name}
              </h2>
              <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                {tool.description}
              </p>
              <a 
                href={tool.url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  backgroundColor: '#3b82f6', 
                  color: 'white', 
                  padding: '0.75rem 1.5rem', 
                  borderRadius: '8px', 
                  textDecoration: 'none', 
                  fontWeight: '600',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
              >
                Launch Tool →
              </a>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer style={{ textAlign: 'center', padding: '2rem 0', borderTop: '1px solid #334155', color: '#64748b' }}>
          <p>&copy; 2024 24KGAL Tools. All rights reserved.</p>
          <p style={{ marginTop: '0.5rem' }}>
            AI Marketing, WhatsApp & OSINT Intelligence Suite
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;