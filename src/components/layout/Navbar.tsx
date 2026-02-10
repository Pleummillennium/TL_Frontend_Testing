import { LayoutGrid } from 'lucide-react'
import GradientText from '../reactbits/GradientText'

const navLinks = [
  { label: 'My requests', active: true },
  { label: 'My approve', active: false },
  { label: 'History', active: false },
]

export default function Navbar() {
  return (
    <nav className="h-16 border-b border-gray-200 bg-white px-6 flex justify-between items-center">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <LayoutGrid className="w-6 h-6 text-blue-600" />
        <GradientText
          colors={['#2563eb', '#7c3aed', '#2563eb']}
          animationSpeed={6}
          className="text-lg font-bold"
        >
          Portal
        </GradientText>
      </div>

      {/* Center: Nav links (hidden on mobile) */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <button
            key={link.label}
            className={`text-sm transition-colors ${
              link.active
                ? 'font-semibold text-gray-900'
                : 'font-medium text-gray-500 hover:text-gray-700'
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Right: User avatar */}
      <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">
        <span className="text-sm font-semibold text-white">AT</span>
      </div>
    </nav>
  )
}
