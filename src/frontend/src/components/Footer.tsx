import { SiLinkedin, SiInstagram } from 'react-icons/si';
import { Heart, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <img
              src="/assets/generated/collabsy-wordmark.dim_600x160.png"
              alt="Collabsy"
              className="h-8 w-auto"
            />
            <p className="text-sm text-muted-foreground leading-relaxed">
              The all-in-one platform connecting brands with creators for authentic influencer partnerships.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Platform</h3>
            <ul className="space-y-3">
              <li>
                <a href="/for-brands" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  For Brands
                </a>
              </li>
              <li>
                <a href="/for-creators" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  For Creators
                </a>
              </li>
              <li>
                <a href="/signup" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Sign Up
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="tel:+919759651314" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>9759651314</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:collabsy.co.in@gmail.com" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  <span>collabsy.co.in@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/coll.absy?igsh=MW94MDdscGVjNDdiZA==" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Follow us on Instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/dhruv-lawaniya-74886b2b4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Connect with us on LinkedIn"
              >
                <SiLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            © 2026. Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
            <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
