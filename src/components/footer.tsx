"use client";

import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import Link from "next/link";

function useFooterLinks() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return {
    company: [
      { name: nav("about"), href: "#" },
      { name: nav("services"), href: "#" },
      { name: nav("contact"), href: "#" },
    ],
    legal: [
      { name: t("privacyPolicy"), href: "#" },
      { name: t("termsOfService"), href: "#" },
    ],
  };
}

const socialLinks = [
  { name: "LinkedIn", icon: LinkedInLogoIcon, href: "#" },
  { name: "GitHub", icon: GitHubLogoIcon, href: "#" },
  { name: "Twitter", icon: TwitterLogoIcon, href: "#" },
];

export function Footer() {
  const footerLinks = useFooterLinks();
  const t = useTranslations("footer");

  return (
    <footer className="text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-primary mb-2">Liro</h3>
            <p className="text-gray-400 text-sm">{t("tagline")}</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.company.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-gray-300 hover:text-primary transition-colors text-sm"
              >
                {link.name}
              </Link>
            ))}
            {footerLinks.legal.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-gray-300 hover:text-primary transition-colors text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-6 pt-6 text-center">
          <p className="text-gray-400 text-sm">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
