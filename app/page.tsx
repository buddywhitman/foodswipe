import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Heart, Zap, Star, ChefHat } from "lucide-react"
import Link from "next/link"
import { LandingLocationBar } from "@/components/landing-location-bar"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                FoodSwipe
              </span>
            </div>
            <LandingLocationBar />
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors">
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors"
            >
              How it Works
            </Link>
            <Link
              href="/auth/signin"
              className="text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors"
            >
              Sign In
            </Link>
            <ThemeToggle />
            <Button
              asChild
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-800">
            🎉 Now Live in Indian Cities
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent leading-tight">
            Swipe Your Way to
            <br />
            Perfect Meals
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Discover dishes you'll love with AI-powered recommendations.
            <br />
            Order together with friends in our revolutionary group mode.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
              asChild
            >
              <Link href="/auth/signup">
                Start Swiping <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 rounded-full border-2 hover:bg-orange-50 dark:hover:bg-orange-900/20 bg-transparent"
              asChild
            >
              <Link href="#demo">Watch Demo</Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-red-400 border-2 border-white dark:border-gray-800"
                  />
                ))}
              </div>
              <span>Join 10,000+ food lovers</span>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-1">4.9/5 rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">Why Choose FoodSwipe?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're revolutionizing how you discover and order food with cutting-edge AI and social features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">AI-Powered Discovery</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Our smart algorithm learns your taste preferences and suggests dishes you'll absolutely love, not just
                restaurants.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">Group Ordering Magic</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                End group food debates forever. Everyone swipes, we find dishes everyone loves, and ordering becomes
                effortless.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Swipe through dishes in seconds, get instant recommendations, and place orders faster than ever before.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">How FoodSwipe Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Three simple steps to your perfect meal</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">Swipe & Discover</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Swipe right on dishes that look amazing, left on ones that don't. Our AI learns your preferences with
                every swipe.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">Group or Solo</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Order for yourself or create a group session. Friends join, everyone swipes, and we find dishes you all
                agree on.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">Order & Enjoy</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Place your order with one tap. Track delivery in real-time and enjoy your perfectly matched meal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500 dark:from-red-900 dark:to-red-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-orange-100 dark:text-gray-300">Happy Users</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
              <div className="text-orange-100 dark:text-gray-300">Dishes Discovered</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">200+</div>
              <div className="text-orange-100 dark:text-gray-300">Partner Restaurants</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">95%</div>
              <div className="text-orange-100 dark:text-gray-300">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
              Ready to Transform Your Food Experience?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of food lovers who've already discovered their new favorite dishes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg px-8 py-6 rounded-full"
                asChild
              >
                <Link href="/auth/signup">
                  Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 rounded-full border-2 bg-transparent dark:bg-gray-800"
                asChild
              >
                <Link href="/demo">Try Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ChefHat className="h-8 w-8 text-orange-500" />
                <span className="text-2xl font-bold">FoodSwipe</span>
              </div>
              <p className="text-gray-400 dark:text-gray-300">
                Revolutionizing food discovery with AI-powered recommendations and social ordering.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 dark:text-white">Product</h4>
              <ul className="space-y-2 text-gray-400 dark:text-gray-300">
                <li>
                  <Link href="#features" className="hover:text-white dark:hover:text-gray-200 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="hover:text-white dark:hover:text-gray-200 transition-colors">
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white dark:hover:text-gray-200 transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 dark:text-white">Company</h4>
              <ul className="space-y-2 text-gray-400 dark:text-gray-300">
                <li>
                  <Link href="/about" className="hover:text-white dark:hover:text-gray-200 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white dark:hover:text-gray-200 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white dark:hover:text-gray-200 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 dark:text-white">Support</h4>
              <ul className="space-y-2 text-gray-400 dark:text-gray-300">
                <li>
                  <Link href="/help" className="hover:text-white dark:hover:text-gray-200 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white dark:hover:text-gray-200 transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white dark:hover:text-gray-200 transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center text-gray-400 dark:text-gray-300">
            <p>&copy; 2024 FoodSwipe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
