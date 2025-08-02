import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

const footerLinks = {
  company: [
    { name: "About", href: "#" },
    { name: "Services", href: "#" },
    { name: "Contact", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
};

const socialLinks = [
  { name: "LinkedIn", icon: LinkedInLogoIcon, href: "#" },
  { name: "GitHub", icon: GitHubLogoIcon, href: "#" },
  { name: "Twitter", icon: TwitterLogoIcon, href: "#" },
];

export function Footer() {
  return (
    <footer className="text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-lime-300 mb-2">Liro</h3>
            <p className="text-gray-400 text-sm">
              Building the future with innovative technology
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.company.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-300 hover:text-lime-300 transition-colors text-sm"
              >
                {link.name}
              </a>
            ))}
            {footerLinks.legal.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-300 hover:text-lime-300 transition-colors text-sm"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-gray-400 hover:text-lime-300 transition-colors"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-6 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Liro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
