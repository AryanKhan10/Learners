import {Link} from "react-router-dom"
// import Image from "next/image"
import { Facebook, Twitter, Youtube, Instagram } from "lucide-react"

 function Footer() {
  return (
    <footer className="bg-[#0D1117] text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-4">
   
              <span className="text-white font-semibold">Learner</span>
            </Link>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="hover:text-white">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="hover:text-white">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="hover:text-white">
                <Youtube size={20} />
              </Link>
              <Link href="#" className="hover:text-white">
                <Instagram size={20} />
              </Link>
            </div>
          </div>

          {/* Resources Section */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Chart Sheet
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Code challenges
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Docs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Videos
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Workspaces
                </Link>
              </li>
            </ul>
          </div>

          {/* Plans Section */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-semibold mb-4">Plans</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white">
                  Paid memberships
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  For students
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Business solutions
                </Link>
              </li>
            </ul>

            <h3 className="text-white font-semibold mt-6 mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white">
                  Forums
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Chapters
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Subjects Section */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-semibold mb-4">Subjects</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white">
                  Cloud Computing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Code Foundations
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Computer Science
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Cybersecurity
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Data Analytics
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Data Science
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Data Visualization
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Developer Tools
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  DevOps
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Game Development
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Machine Learning
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Math
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Mobile Development
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Web Design
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Web Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Languages Section */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-semibold mb-4">Languages</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white">
                  Bash
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  C
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  C++
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  C#
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Go
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  HTML & CSS
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Java
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  JavaScript
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Kotlin
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  PHP
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Python
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  R
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Ruby
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  SQL
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Swift
                </Link>
              </li>
            </ul>
          </div>

          {/* Career Building Section */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-semibold mb-4">Career building</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white">
                  Career paths
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Career services
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Interview prep
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Professional certification
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Full Catalog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Beta Content
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link href="#" className="text-sm hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm hover:text-white">
              Cookie Policy
            </Link>
            <Link href="#" className="text-sm hover:text-white">
              Terms
            </Link>
          </div>
          <div className="text-sm pe-4">copyrights © 2025 Learner</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;