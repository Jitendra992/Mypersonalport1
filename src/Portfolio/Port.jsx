import React, { useState, useEffect } from "react";
import { ArrowDownCircle, Menu, X, ExternalLink, Github, Linkedin, Mail, Moon, Sun } from "lucide-react";
import myPhoto from '../assets/Profile.jpg';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Skills with category grouping
  const skills = [
    { name: "C", category: "Languages", level: 90 },
    { name: "Python", category: "Languages", level: 85 },
    { name: "Java", category: "Languages", level: 80 },
    { name: "C++", category: "Languages", level: 75 },
    { name: "HTML", category: "Frontend", level: 95 },
    { name: "CSS", category: "Frontend", level: 90 },
    { name: "React", category: "Frontend", level: 88 },
    { name: "Tailwind", category: "Frontend", level: 92 },
    { name: "MongoDB", category: "Backend", level: 80 },
    { name: "MySQL", category: "Backend", level: 85 },
    { name: "PHP", category: "Backend", level: 70 },
  ];

  // Projects with more details
  const projects = [
    {
      id: 1,
      title: "Chat Clone",
      description: "A responsive chat application interface built with Tailwind CSS and HTML. Features modern UI elements and is fully responsive across all devices.",
      image: "./web.png",
      link: "https://chat3332.netlify.app/",
      tech: ["HTML", "Tailwind CSS", "Responsive Design"]
    },
    {
      id: 2,
      title: "Meta Homepage Clone",
      description: "A pixel-perfect recreation of Facebook Meta's homepage with grid and flex layouts. Demonstrates attention to detail and modern CSS practices.",
      image: "./Screenshot 2025-02-04 113510.png",
      link: "#",
      tech: ["HTML", "Tailwind CSS", "UI Design"]
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "A personal portfolio website (this one!) built with React and Tailwind CSS, featuring animations and dark/light mode.",
      image: {myPhoto},
      link: "#",
      tech: ["React", "Tailwind CSS", "Animation"]
    }
  ];

  // Handle scroll for navbar highlighting and progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY / scrollHeight;
      setScrollProgress(currentProgress);
      
      // Detect which section is in view
      const sections = ["profile", "skills", "projects", "about", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    setIsMenuOpen(false);
  };

  // Common component for section headers
  const SectionHeader = ({ title, description }) => (
    <div className="text-center mb-16">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h2>
      <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
      {description && <p className="max-w-2xl mx-auto text-center opacity-80">{description}</p>}
    </div>
  );

  // Common styles
  const sectionBg = isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50';
  const cardBg = isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50';
  const inputClass = `w-full px-4 py-3 rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} focus:border-purple-500 outline-none border transition-colors`;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} transition-colors duration-500`}>
      {/* Progress bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Header */}
      <header className={`fixed w-full z-40 transition-all duration-300 ${isDarkMode ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-md shadow-md ${scrollProgress > 0.02 ? 'py-2' : 'py-4'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">J</div>
            <span className="font-bold text-xl hidden sm:block">Jitendra Singh</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex space-x-8">
              {["Profile", "Skills", "Projects", "About", "Contact"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`relative py-2 font-medium transition-colors ${activeSection === item.toLowerCase() ? 'text-purple-500' : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    {item}
                    {activeSection === item.toLowerCase() && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button
              className="lg:hidden p-2 rounded-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 z-30 bg-black/90 backdrop-blur-md transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full">
          <ul className="space-y-8 text-center">
            {["Profile", "Skills", "Projects", "About", "Contact"].map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-2xl font-semibold text-white hover:text-purple-400 transition-colors"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <main className="pt-20">
        {/* Hero Section */}
        <section id="profile" className="min-h-screen flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className={`absolute inset-0 opacity-20 ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'}`}></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
          </div>
          
          <div className="container mx-auto px-4 z-10 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="space-y-6">
                  <div>
                    <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-500 font-medium text-sm mb-4">
                      React.js Developer
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                      Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">Jitendra Singh</span>
                    </h1>
                    <p className="mt-6 text-lg max-w-lg leading-relaxed opacity-90">
                      I'm a passionate web developer who transforms ideas into stunning digital experiences. Specializing in React.js development with a strong eye for design and attention to detail.
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 pt-4">
                    <a href="/resume.pdf" download="Jitendra_resume.pdf" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                      Download Resume <ArrowDownCircle size={18} />
                    </a>
                    <button onClick={() => scrollToSection('contact')} className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border ${isDarkMode ? 'border-gray-700 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'} font-medium transition-colors`}>
                      Contact Me
                    </button>
                  </div>
                  
                  <div className="flex gap-5 pt-4">
                    {[
                      { icon: Github, href: "https://github.com/Jitendra992" },
                      { icon: Linkedin, href: "https://www.linkedin.com/in/jitendra-kumar-bb5143322/" },
                      { icon: Mail, href: "mailto:your.email@example.com" }
                    ].map((item, i) => (
                      <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-100 transition-colors">
                        <item.icon size={24} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 flex justify-center">
                <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse opacity-70 blur-xl"></div>
                  <div className="absolute inset-2 rounded-full "></div>
                  <img className="absolute inset-3 object-cover rounded-full border-4 border-white/10" src={myPhoto} alt="Jitendra Singh" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <button onClick={() => scrollToSection('skills')} className="p-2 rounded-full bg-white/10 backdrop-blur-md">
              <ArrowDownCircle size={24} className="text-purple-400" />
            </button>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 relative">
          <div className={`absolute inset-0 ${sectionBg}`}></div>
          <div className="container mx-auto px-4 relative z-10">
            <SectionHeader 
              title="My Technical Skills" 
              description="Here are the technologies and programming languages I've mastered throughout my journey as a developer"
            />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {["Languages", "Frontend", "Backend"].map(category => (
                <div key={category} className={`p-6 rounded-xl transition-all ${cardBg} shadow-lg hover:shadow-xl`}>
                  <h3 className="text-xl font-semibold mb-6">{category}</h3>
                  <div className="space-y-6">
                    {skills
                      .filter(skill => skill.category === category)
                      .map(skill => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-sm opacity-80">{skill.level}%</span>
                          </div>
                          <div className={`h-2 w-full rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                            <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${skill.level}%` }}></div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <div className="container mx-auto px-4">
            <SectionHeader 
              title="Featured Projects" 
              description="Check out some of my recent work that showcases my skills and passion for web development"
            />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div key={project.id} className={`group rounded-xl overflow-hidden transition-all ${cardBg} shadow-lg hover:shadow-xl`}>
                  <div className="relative h-56 overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full">
                        <div className="flex justify-end">
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                            <ExternalLink size={18} className="text-white" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="opacity-80 mb-4 text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, index) => (
                        <span key={index} className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-purple-500 hover:text-purple-400 transition-colors">
                      View Project <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 relative">
          <div className={`absolute inset-0 ${sectionBg}`}></div>
          <div className="container mx-auto px-4 relative z-10">
            <SectionHeader title="About Me" />
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                  <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
                  <p className="mb-4 leading-relaxed">
                    Hi! I'm Jitendra Kumar, a passionate Web Developer with a strong eye for detail and a love for creating impactful designs and functional websites. I specialize in building modern web applications using React.js and other cutting-edge technologies.
                  </p>
                  <p className="mb-4 leading-relaxed">
                    My journey in web development began with a curiosity for how things work on the internet, which quickly evolved into a passion for creating beautiful and functional digital experiences. I constantly strive to improve my skills and stay updated with the latest trends and technologies.
                  </p>
                  <p className="leading-relaxed">
                    When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enhancing my problem-solving skills through competitive programming.
                  </p>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 flex justify-center">
                <img className={`rounded-lg shadow-xl max-w-md w-full ${isDarkMode ? 'opacity-80' : 'opacity-100'} transition-opacity`}
                  src="https://static.vecteezy.com/system/resources/previews/044/448/928/large_2x/cartoon-character-with-the-desk-working-concept-illustration-free-png.png" 
                  alt="About Jitendra" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="container mx-auto px-4">
            <SectionHeader 
              title="Get In Touch" 
              description="Feel free to reach out for collaborations or just a friendly chat"
            />
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div className={`p-8 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {[
                    { icon: Mail, title: "Email", link: "mailto:your.email@example.com", text: "your.email@example.com" },
                    { icon: Github, title: "GitHub", link: "https://github.com/Jitendra992", text: "Jitendra992" },
                    { icon: Linkedin, title: "LinkedIn", link: "https://www.linkedin.com/in/jitendra-kumar-bb5143322/", text: "Jitendra Kumar" }
                  ].map((contact, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <contact.icon size={20} className="text-purple-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">{contact.title}</h4>
                        <a href={contact.link} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:text-purple-500 transition-colors">{contact.text}</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={`p-8 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <h3 className="text-2xl font-semibold mb-6">Send Me a Message</h3>
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                      <input type="text" id="name" className={inputClass} placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                      <input type="email" id="email" className={inputClass} placeholder="Your email" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                    <input type="text" id="subject" className={inputClass} placeholder="Subject" />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                    <textarea id="message" rows="5" className={inputClass} placeholder="Your message"></textarea>
                  </div>
                  
                  <button type="submit" className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className={`py-8 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © {new Date().getFullYear()} Jitendra Singh. All rights reserved.
            </p>
            
            <div className="flex gap-4">
              {[
                { icon: Github, href: "https://github.com/Jitendra992" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/jitendra-kumar-bb5143322/" },
                { icon: Mail, href: "mailto:your.email@example.com" }
              ].map((item, i) => (
                <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}>
                  <item.icon size={20} className={isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;