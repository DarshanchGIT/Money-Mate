import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { ArrowRight, DollarSign, PiggyBank, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">MoneyMate</div>
          <div className="space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section with Background Icons */}
      <section className="container mx-auto px-4 py-20 text-center">
        {/* Hero Content */}
        <div>
          <h1 className="text-5xl font-bold mb-6">
            Manage Your Money with Ease
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            MoneyMate helps you track, save, and grow your finances. Join
            thousands of users taking control of their financial future.
          </p>
          <Button size="lg" asChild>
            <Link to="/signup">
              Start Your Financial Journey <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose MoneyMate?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <DollarSign className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Transactions</h3>
              <p>
                Send and receive money with just a few taps. I&apos;s that
                simple.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <PiggyBank className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Savings</h3>
              <p>
                Set savings goals and watch your money grow with our intelligent
                tools.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Instant Insights</h3>
              <p>
                Get real-time updates and insights into your spending habits.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonial Section with Avatars */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage
                      src="/placeholder.svg?height=48&width=48"
                      alt="Sarah J."
                    />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">Sarah J.</div>
                    <div className="text-sm text-muted-foreground">
                      Financial Analyst
                    </div>
                  </div>
                </div>
                <p className="italic mb-4">
                  &quot;MoneyMate has completely transformed how I manage my
                  finances. It&apos;s intuitive, powerful, and actually makes
                  budgeting fun!&quot;
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage
                      src="/placeholder.svg?height=48&width=48"
                      alt="Michael T."
                    />
                    <AvatarFallback>MT</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">Michael T.</div>
                    <div className="text-sm text-muted-foreground">
                      Small Business Owner
                    </div>
                  </div>
                </div>
                <p className="italic mb-4">
                  &quot;I&apos;ve tried many finance apps, but MoneyMate stands
                  out with its user-friendly interface and helpful insights.
                  Highly recommended!&quot;
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Take Control of Your Finances?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join MoneyMate today and start your journey towards financial freedom.
        </p>
        <Button size="lg" asChild>
          <Link to="/signup">
            Sign Up Now - It&apos;s Free! <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">MoneyMate</h3>
              <p>Your trusted partner in personal finance management.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="hover:underline">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:underline">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="hover:underline">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2024 MoneyMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
