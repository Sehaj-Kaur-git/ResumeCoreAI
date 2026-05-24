"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import * as THREE from "three"

export default function LandingPage() {
  const router = useRouter()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)

 
  useEffect(() => {
  if (!canvasRef.current) return

  const canvas = canvasRef.current
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  })

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  
  const count = 600
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

  const material = new THREE.PointsMaterial({
    size: 0.08,          
    color: "#0891b2",    
    transparent: true,
    opacity: 0.9,       
  })

  const points = new THREE.Points(geometry, material)
  scene.add(points)

  camera.position.z = 6

 
  const mouse = new THREE.Vector2(0, 0)

  const handleMouseMove = (e: MouseEvent) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
  }

  window.addEventListener("mousemove", handleMouseMove)

  let animationId: number

  const animate = () => {
    animationId = requestAnimationFrame(animate)

    const pos = geometry.attributes.position.array as Float32Array

    for (let i = 0; i < count; i++) {
      const ix = i * 3
      const iy = i * 3 + 1

      const dx = pos[ix] - mouse.x * 5
      const dy = pos[iy] - mouse.y * 5

      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 1.5) {
        pos[ix] += dx * 0.03
        pos[iy] += dy * 0.03
      }
    }

    geometry.attributes.position.needsUpdate = true

  
    points.rotation.y += 0.0005

    renderer.render(scene, camera)
  }

  animate()

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  window.addEventListener("resize", handleResize)

  return () => {
    cancelAnimationFrame(animationId)
    window.removeEventListener("resize", handleResize)
    window.removeEventListener("mousemove", handleMouseMove)
    renderer.dispose()
    geometry.dispose()
    material.dispose()
  }
}, [])

  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.6,
      })

      gsap.from(".hero-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })

      gsap.from(".hero-sub", {
        y: 30,
        opacity: 0,
        delay: 0.3,
      })

      gsap.from(".hero-cta", {
        scale: 0.9,
        opacity: 0,
        delay: 0.5,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-cyan-50 to-teal-50">

      
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      
      <nav
        ref={navRef}
        className="backdrop-blur-md bg-white/70 border border-white/40 shadow-sm rounded-2xl mx-auto mt-6 max-w-6xl px-6 py-3 flex justify-between items-center"
      >
        <h1 className="font-semibold text-lg text-slate-800">
          Resume-Core
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => router.push("/login")}
            className="text-sm text-slate-600 hover:text-slate-900 transition"
          >
            Login
          </button>

          <button
            onClick={() => router.push("/register")}
            className="text-sm px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-black transition"
          >
            Sign up
          </button>
        </div>
      </nav>

      
      <main
        ref={heroRef}
        className="flex flex-col items-center justify-center text-center px-6 pt-28"
      >
        <h1 className="hero-title text-5xl md:text-7xl font-bold text-slate-900 leading-tight">
          Crack Interviews with{" "}
          <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
            AI Guidance
          </span>
        </h1>

        <p className="hero-sub mt-6 text-lg text-slate-600 max-w-xl">
          Upload your resume, match job roles, discover skill gaps, and get AI-powered interview questions tailored just for you.
        </p>

        
        <div className="hero-cta flex gap-4 mt-10">
          <button
            onClick={() => router.push("/register")}
            className="px-6 py-3 rounded-xl bg-slate-900 text-white shadow-md hover:scale-105 transition"
          >
            Get Started
          </button>
        </div>

        
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "Resume Analysis",
            "Skill Gap Detection",
            "ATS Score",
            "Interview Questions",
          ].map((item) => (
            <div
              key={item}
              className="px-4 py-3 bg-white/70 backdrop-blur-md border border-white rounded-xl shadow-sm text-sm text-slate-600 hover:shadow-md transition"
            >
              {item}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}