import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Briefcase, Users, ArrowLeft, Moon, Sun, Send, MessageSquare, User, Bot, Mail, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const consultancyLinks = [
  { title: "Home", url: "/consultancy", icon: Home },
  { title: "Services", url: "/consultancy/services", icon: Briefcase },
  { title: "Team", url: "/consultancy/team", icon: Users },
];

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ConsultancyMessages = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! Welcome to Binary Consultancy Services. 👋\n\nHow can we help you today? Feel free to ask about our research consultancy, capacity building, or any of our services.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [showUserInfoForm, setShowUserInfoForm] = useState(true);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = document.documentElement.classList.contains("dark");
    setIsDark(current);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

    if (showUserInfoForm && (!userInfo.name || !userInfo.email)) {
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsSending(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: "Thank you for your message! 🙏\n\nWe've received your inquiry and will get back to you within 24 hours. In the meantime, you can also reach us at:\n\n📧 consultancy@binaryhub.pk\n📞 +92-21-3586-2100",
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botResponse]);
    setIsSending(false);

    if (showUserInfoForm) {
      const subject = "Inquiry from Consultancy Chat";
      const allMessages = [...messages, userMessage];
      const body = `Name: ${userInfo.name}\nEmail: ${userInfo.email}\nPhone: ${userInfo.phone || "Not provided"}\n\nMessages:\n${allMessages.map(m => `${m.sender === "user" ? "User" : "Bot"}: ${m.text}`).join("\n")}`;
      const mailtoLink = `mailto:consultancy@binaryhub.pk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 2000);
      
      setShowUserInfoForm(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const isFormValid = userInfo.name.trim() && userInfo.email.trim();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
          </a>
          
          <nav className="hidden md:flex items-center gap-2">
            <NavLink
              to="/"
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/15 dark:hover:bg-white/15 text-foreground/80 hover:text-foreground transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </NavLink>
            {consultancyLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.url}
                  to={link.url}
                  end={link.url === "/consultancy"}
                  className={({ isActive }) =>
                    `flex items-center gap-2 text-sm px-5 py-2.5 font-medium transition-all duration-200 rounded-full ${
                      isActive
                        ? "bg-brand-orange text-white shadow-lg"
                        : "bg-brand-orange/80 text-white hover:bg-brand-orange hover:shadow-md"
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {link.title}
                </NavLink>
              );
            })}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue text-white">
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm font-medium">Messages</span>
            </div>
            <Button 
              onClick={toggleTheme} 
              variant="outline" 
              size="icon" 
              className="rounded-full border-black/20 dark:border-white/20 w-10 h-10 ml-2"
            >
              {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </nav>

          <div className="flex md:hidden items-center gap-2">
            <Button 
              onClick={toggleTheme} 
              variant="outline" 
              size="icon" 
              className="rounded-full border-black/20 dark:border-white/20 w-10 h-10"
            >
              {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <div className="md:hidden border-t border-white/10 bg-background/90 backdrop-blur">
          <div className="container mx-auto px-2 py-2 flex gap-1 overflow-x-auto">
            <NavLink
              to="/"
              className="flex items-center gap-1 text-xs px-3 py-2 rounded-full bg-black/10 dark:bg-white/10 whitespace-nowrap"
            >
              <ArrowLeft className="h-3 w-3" />
              Back
            </NavLink>
            {consultancyLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.url}
                  to={link.url}
                  end={link.url === "/consultancy"}
                  className="flex items-center gap-1 text-xs px-3 py-2 font-medium rounded-full whitespace-nowrap bg-brand-orange/80 text-white"
                >
                  <Icon className="h-3 w-3" />
                  {link.title}
                </NavLink>
              );
            })}
            <div className="flex items-center gap-1 text-xs px-3 py-2 font-medium rounded-full whitespace-nowrap bg-brand-blue text-white">
              <MessageSquare className="h-3 w-3" />
              Messages
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar - Contact Info */}
        <aside className="hidden lg:flex w-80 flex-col border-r border-white/10 bg-gradient-to-b from-brand-orange/5 to-brand-blue/5">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-orange to-brand-blue flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Binary Consultancy</h2>
                <p className="text-sm text-foreground/60">Research & Capacity Building</p>
              </div>
            </div>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Get expert support for your research projects, from proposal writing to data analysis.
            </p>
          </div>

          {/* Quick Contact */}
          <div className="p-6 space-y-4">
            <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider">Quick Contact</h3>
            
            <a
              href="mailto:consultancy@binaryhub.pk"
              className="flex items-center gap-3 p-4 rounded-2xl bg-brand-orange/10 hover:bg-brand-orange/20 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">Email Us</p>
                <p className="text-xs text-foreground/60">consultancy@binaryhub.pk</p>
              </div>
            </a>

            <a
              href="tel:+92-21-3586-2100"
              className="flex items-center gap-3 p-4 rounded-2xl bg-brand-blue/10 hover:bg-brand-blue/20 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">Call Us</p>
                <p className="text-xs text-foreground/60">+92-21-3586-2100</p>
              </div>
            </a>
          </div>

          {/* Response Time */}
          <div className="mt-auto p-6 border-t border-white/10">
            <div className="flex items-center gap-2 text-sm text-foreground/60">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Typically replies within 24 hours</span>
            </div>
          </div>
        </aside>

        {/* Chat Area */}
        <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
          {/* Chat Header */}
          <div className="p-4 md:p-6 border-b border-white/10 bg-background/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-orange to-brand-blue flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-background" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Chat with Us</h1>
                  <p className="text-sm text-foreground/60">We're here to help</p>
                </div>
              </div>
              <div className="flex gap-2">
                <a
                  href="mailto:consultancy@binaryhub.pk"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 hover:bg-brand-orange/20 text-brand-orange text-sm font-medium transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span className="hidden sm:inline">Email</span>
                </a>
                <a
                  href="tel:+92-21-3586-2100"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 hover:bg-brand-blue/20 text-brand-blue text-sm font-medium transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span className="hidden sm:inline">Call</span>
                </a>
              </div>
            </div>
          </div>

          {/* User Info Form */}
          {showUserInfoForm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 md:p-6 border-b border-white/10 bg-gradient-to-r from-brand-orange/5 to-brand-blue/5"
            >
              <p className="text-sm text-foreground/70 mb-4">Please introduce yourself to start the conversation:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="relative">
                  <Input
                    placeholder="Your name *"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    onFocus={() => setFocusedInput('name')}
                    onBlur={() => setFocusedInput(null)}
                    className={`
                      rounded-xl border-2 transition-all duration-300 bg-background/50
                      ${focusedInput === 'name' ? 'border-brand-orange shadow-lg shadow-brand-orange/20' : 'border-white/10'}
                      ${userInfo.name ? 'border-green-500/50' : ''}
                    `}
                    required
                  />
                  {userInfo.name && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-500" />
                  )}
                </div>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Your email *"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    className={`
                      rounded-xl border-2 transition-all duration-300 bg-background/50
                      ${focusedInput === 'email' ? 'border-brand-orange shadow-lg shadow-brand-orange/20' : 'border-white/10'}
                      ${userInfo.email ? 'border-green-500/50' : ''}
                    `}
                    required
                  />
                  {userInfo.email && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-500" />
                  )}
                </div>
                <Input
                  type="tel"
                  placeholder="Phone (optional)"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                  onFocus={() => setFocusedInput('phone')}
                  onBlur={() => setFocusedInput(null)}
                  className={`
                    rounded-xl border-2 transition-all duration-300 bg-background/50
                    ${focusedInput === 'phone' ? 'border-brand-blue shadow-lg shadow-brand-blue/20' : 'border-white/10'}
                  `}
                />
              </div>
            </motion.div>
          )}

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "bot" && (
                  <Avatar className="w-10 h-10 rounded-xl border-2 border-white/10 flex-shrink-0">
                    <AvatarFallback className="bg-gradient-to-br from-brand-orange to-brand-blue text-white rounded-xl">
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`
                    max-w-[80%] md:max-w-[70%] rounded-2xl px-5 py-4 shadow-lg
                    ${message.sender === "user"
                      ? "bg-gradient-to-r from-brand-orange to-brand-orange-hover text-white rounded-br-md"
                      : "bg-white/10 dark:bg-white/5 backdrop-blur-sm text-foreground rounded-bl-md border border-white/10"
                    }
                  `}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  <p className={`text-xs mt-3 ${message.sender === "user" ? "text-white/60" : "text-foreground/40"}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
                {message.sender === "user" && (
                  <Avatar className="w-10 h-10 rounded-xl border-2 border-white/10 flex-shrink-0">
                    <AvatarFallback className="bg-brand-blue text-white rounded-xl">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))}
            
            {/* Typing Indicator */}
            {isSending && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 justify-start"
              >
                <Avatar className="w-10 h-10 rounded-xl border-2 border-white/10">
                  <AvatarFallback className="bg-gradient-to-br from-brand-orange to-brand-blue text-white rounded-xl">
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-2xl rounded-bl-md px-5 py-4 border border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2.5 h-2.5 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2.5 h-2.5 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 md:p-6 border-t border-white/10 bg-background/50">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <div className="flex-1 relative">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={
                    !isFormValid
                      ? "Please fill in your name and email above..."
                      : "Type your message..."
                  }
                  disabled={isSending || !isFormValid}
                  className={`
                    w-full rounded-2xl border-2 py-6 px-5 pr-14 transition-all duration-300 bg-background/50
                    ${!isFormValid ? 'opacity-60' : 'border-white/10 focus:border-brand-orange focus:shadow-lg focus:shadow-brand-orange/10'}
                  `}
                />
              </div>
              <Button
                type="submit"
                disabled={isSending || !inputMessage.trim() || !isFormValid}
                className={`
                  rounded-2xl px-6 h-auto transition-all duration-300
                  ${isFormValid && inputMessage.trim()
                    ? "bg-gradient-to-r from-brand-orange to-brand-orange-hover hover:shadow-lg hover:shadow-brand-orange/30 hover:scale-105"
                    : "bg-gray-400 cursor-not-allowed"
                  }
                `}
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
            <p className="text-xs text-foreground/40 mt-3 text-center">
              Press Enter to send • We typically respond within 24 hours
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ConsultancyMessages;
