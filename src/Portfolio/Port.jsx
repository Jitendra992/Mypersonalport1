
import React, { useState, useEffect, useRef } from "react";

import { 
  ArrowDownCircle, Menu, X, ExternalLink, Github, 
  Linkedin, Mail, Moon, Sun, Code, Command, Globe,
  Database, Layout, Cpu
} from "lucide-react";

import myphoto from "../assets/Profile.jpg";



const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  
  // Refs for animations
  const heroRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  
  const skills = [
    { name: "C", category: "Languages", level: 90, icon: <Code size={20} /> },
    { name: "Python", category: "Languages", level: 85, icon: <Command size={20} /> },
    { name: "Java", category: "Languages", level: 80, icon: <Cpu size={20} /> },
    { name: "C++", category: "Languages", level: 75, icon: <Code size={20} /> },
    { name: "HTML", category: "Frontend", level: 95, icon: <Layout size={20} /> },
    { name: "CSS", category: "Frontend", level: 90, icon: <Layout size={20} /> },
    { name: "React", category: "Frontend", level: 88, icon: <Globe size={20} /> },
    { name: "Tailwind", category: "Frontend", level: 92, icon: <Layout size={20} /> },
    { name: "MongoDB", category: "Backend", level: 80, icon: <Database size={20} /> },
    { name: "MySQL", category: "Backend", level: 85, icon: <Database size={20} /> },
    { name: "PHP", category: "Backend", level: 70, icon: <Code size={20} /> },
  ];

  const projects = [
    {
      id: 1,
      title: "Chat Clone",
      description: "A responsive chat application interface built with Tailwind CSS and HTML. Features modern UI elements and is fully responsive across all devices.",
      image: "./web.png",
      link: "https://chat3332.netlify.app/",
      tech: ["HTML", "Tailwind CSS", "Responsive Design"],
      color: "from-blue-500 to-cyan-400"
    },
    {
      id: 2,
      title: "Meta Homepage Clone",
      description: "A pixel-perfect recreation of Facebook Meta's homepage with grid and flex layouts. Demonstrates attention to detail and modern CSS practices.",
      image: "./Screenshot 2025-02-04 113510.png",
      link: "#",
      tech: ["HTML", "Tailwind CSS", "UI Design"],
      color: "from-purple-500 to-pink-400"
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "A personal portfolio website (this one!) built with React and Tailwind CSS, featuring animations and dark/light mode.",
      image: {myphoto},
      link: "#",
      tech: ["React", "Tailwind CSS", "Animation"],
      color: "from-emerald-500 to-green-400"
    }
  ];

    useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

   useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

    useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY / scrollHeight;
      setScrollProgress(currentProgress);
      
           if (window.scrollY > 100 && showScrollIndicator) {
        setShowScrollIndicator(false);
      }

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
  }, [showScrollIndicator]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "-50px"
    };
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const sections = document.querySelectorAll('.reveal-section');
    sections.forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, [isLoading]);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    setIsMenuOpen(false);
  };

  const SectionHeader = ({ title, description }) => (
    <div className="text-center mb-16 reveal-section opacity-0 translate-y-10 transition-all duration-700">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 relative inline-block">
        {title}
        <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
      </h2>
      {description && (
        <p className="max-w-2xl mx-auto text-center opacity-80 mt-6">
          {description}
        </p>
      )}
    </div>
  );

  const sectionBg = isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50';
  const cardBg = isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50';
  const inputClass = `w-full px-4 py-3 rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} focus:border-purple-500 outline-none border transition-colors`;

 
  const LoadingScreen = () => (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-opacity duration-500 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="flex flex-col items-center">
        <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-spin flex items-center justify-center">
          <div className={`h-16 w-16 rounded-full ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}></div>
        </div>
        <div className="mt-6 text-xl font-semibold relative">
          <span className="inline-block overflow-hidden animate-reveal">
            Jitendra Singh
          </span>
        </div>
      </div>
    </div>
  );

 
  const CustomCursor = () => (
    <div 
      className="hidden md:block fixed w-6 h-6 rounded-full border-2 border-purple-500 pointer-events-none z-50 transition-transform duration-200 transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)'
      }}
    >
      <div className="absolute inset-0 bg-purple-500 rounded-full scale-25 opacity-50"></div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} transition-colors duration-500`}>
     
      <LoadingScreen />
      
     
      <CustomCursor />
      
      
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      />

    
      <header className={`fixed w-full z-40 transition-all duration-300 ${isDarkMode ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-xl shadow-md ${scrollProgress > 0.02 ? 'py-2' : 'py-4'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl relative overflow-hidden transition-all duration-500 group-hover:shadow-lg group-hover:shadow-purple-500/30">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative z-10">J</span>
            </div>
            <span className="font-bold text-xl hidden sm:block relative">
              Jitendra Singh
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </span>
          </div>
          
         
          <nav className="hidden lg:block">
            <ul className="flex space-x-8">
              {["Profile", "Skills", "Projects", "About", "Contact"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`relative py-2 font-medium transition-colors group overflow-hidden ${activeSection === item.toLowerCase() ? 'text-purple-500' : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <span className="relative z-10">{item}</span>
                    {activeSection === item.toLowerCase() ? (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                    ) : (
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
         
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-all duration-300 ${isDarkMode ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} hover:shadow-md hover:scale-110`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button
              className="lg:hidden p-2 rounded-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      
      <div className={`lg:hidden fixed inset-0 z-30 bg-black/90 backdrop-blur-md transform transition-all duration-500 ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <ul className="space-y-8 text-center">
            {["Profile", "Skills", "Projects", "About", "Contact"].map((item) => (
              <li key={item} className="transform transition-all duration-300 hover:scale-110">
                <button
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-2xl font-semibold text-white hover:text-purple-400 transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <main className="pt-20">
    
        <section 
          id="profile" 
          ref={heroRef}
          className="min-h-screen flex flex-col justify-center relative overflow-hidden"
        >
          
          <div className="absolute inset-0 z-0">
            <div className={`absolute inset-0 opacity-20 ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'}`}></div>
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-purple-500 opacity-20"
                style={{
                  width: `${Math.random() * 20 + 5}px`,
                  height: `${Math.random() * 20 + 5}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 10 + 15}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              ></div>
            ))}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
          </div>
          
          <div className="container mx-auto px-4 z-10 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="space-y-6 reveal-section opacity-0 translate-y-10 transition-all duration-700">
                  <div>
                    <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-500 font-medium text-sm mb-4 backdrop-blur-sm border border-purple-500/20">
                      React.js Developer
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                      Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient">Jitendra Singh</span>
                    </h1>
                    <p className="mt-6 text-lg max-w-lg leading-relaxed opacity-90">
                      I'm a passionate web developer who transforms ideas into stunning digital experiences. Specializing in React.js development with a strong eye for design and attention to detail.
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 pt-4">
                    <a 
                      href="/resume.pdf" 
                      download="Jitendra_resume.pdf" 
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105 relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                      <span className="relative z-10 flex items-center gap-2">
                        Download Resume <ArrowDownCircle size={18} className="animate-bounce" />
                      </span>
                    </a>
                    <button 
                      onClick={() => scrollToSection('contact')} 
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border ${isDarkMode ? 'border-gray-700 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'} font-medium transition-all hover:scale-105 group relative overflow-hidden`}
                    >
                      <span className={`absolute inset-0 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></span>
                      <span className="relative z-10">Contact Me</span>
                    </button>
                  </div>
                  
                  <div className="flex gap-5 pt-4">
                    {[
                      { icon: Github, href: "https://github.com/Jitendra992" },
                      { icon: Linkedin, href: "https://www.linkedin.com/in/jitendra-kumar-bb5143322/" },
                      { icon: Mail, href: "mailto:your.email@example.com" }
                    ].map((item, i) => (
                      <a 
                        key={i} 
                        href={item.href} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`text-gray-400 hover:text-purple-500 transition-colors p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} hover:scale-125 transform duration-300`}
                        aria-label={item.icon.name}
                      >
                        <item.icon size={24} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 flex justify-center reveal-section opacity-0 translate-y-10 transition-all duration-700">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse opacity-70 blur-xl"></div>
                  
                 
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/30 animate-spin-slow"></div>
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-500/20 animate-spin-slow-reverse" style={{margin: "-15px"}}></div>
                  
               
                  {["React", "CSS", "HTML", "JavaScript"].map((tech, i) => (
                    <div 
                      key={tech}
                      className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-lg"
                      style={{
                        animation: `float-orbit ${10 + i * 2}s linear infinite`,
                        animationDelay: `${i * 0.5}s`,
                        transformOrigin: "center center",
                        left: "calc(50% - 20px)",
                        top: "calc(50% - 20px)",
                      }}
                    >
                      {tech}
                    </div>
                  ))}
                  
                 
                  <div className="absolute inset-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1 animate-morph">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img className="object-cover w-full h-full" src={myphoto} alt="Image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
         
          <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${showScrollIndicator ? 'opacity-100' : 'opacity-0'}`}>
            <button 
              onClick={() => scrollToSection('skills')} 
              className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 hover:scale-110"
              aria-label="Scroll to skills"
            >
              <ArrowDownCircle size={28} className="text-purple-400 animate-bounce" />
            </button>
          </div>
        </section>

       
        <section id="skills" ref={skillsRef} className="py-20 relative">
          <div className={`absolute inset-0 ${sectionBg}`}></div>
          <div className="container mx-auto px-4 relative z-10">
            <SectionHeader 
              title="My Technical Skills" 
              description="Here are the technologies and programming languages I've mastered throughout my journey as a developer"
            />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {["Languages", "Frontend", "Backend"].map((category, index) => (
                <div key={category} className={`p-6 rounded-xl transition-all ${cardBg} shadow-lg hover:shadow-xl reveal-section opacity-0 translate-y-10 transition-all duration-700`} style={{transitionDelay: `${index * 100}ms`}}>
                  <h3 className="text-xl font-semibold mb-6 relative">
                    {category}
                    <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  </h3>
                  <div className="space-y-6">
                    {skills
                      .filter(skill => skill.category === category)
                      .map((skill, idx) => (
                        <div key={skill.name} className="space-y-2 hover:translate-x-1 transition-all duration-300">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className={`p-1 rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                {skill.icon}
                              </div>
                              <span className="font-medium">{skill.name}</span>
                            </div>
                            <span className="text-sm opacity-80">{skill.level}%</span>
                          </div>
                          <div className={`h-2.5 w-full rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden`}>
                            <div 
                              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 relative"
                              style={{ 
                                width: `${skill.level}%`,
                                animation: `growWidth 1.5s ease-out ${idx * 0.2}s forwards`,
                                opacity: 0
                              }}
                            >
                              <div className="absolute top-0 right-0 h-full w-4 bg-white/30 skew-x-12 animate-shimmer"></div>
                            </div>
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

        
        <section id="projects" ref={projectsRef} className="py-20">
          <div className="container mx-auto px-4">
            <SectionHeader 
              title="Featured Projects" 
              description="Check out some of my recent work that showcases my skills and passion for web development"
            />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div 
                  key={project.id} 
                  className={`group rounded-xl overflow-hidden transition-all ${cardBg} shadow-lg hover:shadow-xl transform hover:-translate-y-2 duration-300 reveal-section opacity-0 translate-y-10 transition-all duration-700`}
                  style={{transitionDelay: `${index * 150}ms`}}
                >
                  <div className="relative h-56 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`}></div>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full">
                        <div className="flex justify-end">
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transform hover:scale-110 transition-all duration-300"
                            aria-label={`Visit ${project.title}`}
                          >
                            <ExternalLink size={18} className="text-white" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 relative inline-block">
                      {project.title}
                      <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${project.color} group-hover:w-full transition-all duration-300`}></span>
                    </h3>
                    <p className="opacity-80 mb-4 text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} hover:scale-105 transition-transform duration-200`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`inline-flex items-center gap-1 text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r ${project.color} hover:opacity-80 transition-opacity`}
                    >
                      View Project <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

     
        <section id="about" className="py-20 relative">
        <div className="relative py-24 overflow-hidden">

  <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#2e026d] via-indigo-700 to-[#0f172a] opacity-20 blur-2xl"></div>

  <div className="container mx-auto px-4 relative z-10">
   
    <h2 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-16 animate-typewriter border-r-4 border-white whitespace-nowrap overflow-hidden w-fit mx-auto">
      About Me 🚀
    </h2>

    <div className="grid lg:grid-cols-2 gap-12 items-center">
      
  
      <div className="order-2 lg:order-1 backdrop-blur-xl bg-white/10 dark:bg-gray-800/30 p-8 rounded-3xl border border-white/10 shadow-2xl animate-fade-in">
        <h3 className="text-3xl font-bold mb-4 text-white">My Journey 🌍</h3>
        <p className="mb-5 text-gray-300 leading-relaxed text-lg">
          I'm <span className="font-semibold text-indigo-400">Jitendra Kumar</span>, a developer who turns coffee into code ☕. I specialize in building high-impact, responsive web apps using <strong className="text-pink-400">React.js</strong>, Tailwind, and the latest modern stacks.
        </p>
        <p className="mb-5 text-gray-300 leading-relaxed text-lg">
          What started as curiosity about websites became my full-time passion. I thrive on solving problems, creating UIs that wow users, and exploring the tech galaxy.
        </p>
        <p className="text-gray-300 leading-relaxed text-lg">
          When the laptop closes, I’m exploring new tech, contributing to open source, or leveling up through <strong className="text-yellow-400">competitive coding</strong>.
        </p>
      </div>

     
      <div className="order-1 lg:order-2 flex justify-center group relative animate-fade-in">
        <div className="relative max-w-xs w-full transition-transform duration-500 transform group-hover:rotate-1 group-hover:scale-105">
          <img
            src={myphoto}
            alt="About Jitendra"
            className="rounded-2xl shadow-2xl border-4 border-transparent group-hover:border-indigo-500 transition-all duration-500"
          />
       
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm animate-sweep pointer-events-none"></div>
        </div>
      </div>
    </div>
  </div>
</div>


        </section>

    
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