'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const Phone = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const MessageSquare = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

// Globe Component with Colorful Moving Dots
const Globe = ({ className }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create globe base
    const geometry = new THREE.SphereGeometry(1, 64, 64);

    // Ocean material
    const oceanMaterial = new THREE.MeshBasicMaterial({
      color: 0x1e40af,
      transparent: true,
      opacity: 0.8,
    });

    const globe = new THREE.Mesh(geometry, oceanMaterial);
    scene.add(globe);

    // Create continents using simple shapes
    const continentGroup = new THREE.Group();

    // Function to create continent patches
    const createContinentPatch = (lat, lon, size, color = 0x22c55e) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);

      const x = -(1.01 * Math.sin(phi) * Math.cos(theta));
      const z = 1.01 * Math.sin(phi) * Math.sin(theta);
      const y = 1.01 * Math.cos(phi);

      const patchGeometry = new THREE.SphereGeometry(size, 8, 8);
      const patchMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.9,
      });

      const patch = new THREE.Mesh(patchGeometry, patchMaterial);
      patch.position.set(x, y, z);
      patch.lookAt(0, 0, 0);
      patch.scale.set(1, 1, 0.1);

      return patch;
    };

    // Add major continents (simplified)
    // North America
    continentGroup.add(createContinentPatch(45, -100, 0.15));
    continentGroup.add(createContinentPatch(35, -95, 0.12));
    continentGroup.add(createContinentPatch(25, -80, 0.08));

    // South America
    continentGroup.add(createContinentPatch(-10, -60, 0.12));
    continentGroup.add(createContinentPatch(-20, -65, 0.1));

    // Europe
    continentGroup.add(createContinentPatch(50, 10, 0.08));
    continentGroup.add(createContinentPatch(55, 20, 0.06));

    // Africa
    continentGroup.add(createContinentPatch(0, 20, 0.12));
    continentGroup.add(createContinentPatch(-15, 25, 0.1));
    continentGroup.add(createContinentPatch(-30, 25, 0.08));

    // Asia
    continentGroup.add(createContinentPatch(35, 100, 0.15));
    continentGroup.add(createContinentPatch(50, 90, 0.12));
    continentGroup.add(createContinentPatch(25, 110, 0.1));

    // Australia
    continentGroup.add(createContinentPatch(-25, 135, 0.08));

    scene.add(continentGroup);

    // Create latitude and longitude lines
    const linesGroup = new THREE.Group();

    // Latitude lines
    for (let lat = -80; lat <= 80; lat += 20) {
      const curve = new THREE.EllipseCurve(
        0,
        0,
        1,
        1,
        0,
        2 * Math.PI,
        false,
        0
      );
      const points = curve.getPoints(64);
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x60a5fa,
        transparent: true,
        opacity: 0.3,
      });

      const line = new THREE.Line(lineGeometry, lineMaterial);
      line.rotation.x = Math.PI / 2;
      line.rotation.z = (lat * Math.PI) / 180;
      line.scale.set(
        Math.cos((lat * Math.PI) / 180),
        Math.cos((lat * Math.PI) / 180),
        1
      );

      linesGroup.add(line);
    }

    // Longitude lines
    for (let lon = 0; lon < 360; lon += 30) {
      const curve = new THREE.EllipseCurve(0, 0, 1, 1, 0, Math.PI, false, 0);
      const points = curve.getPoints(32);
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x60a5fa,
        transparent: true,
        opacity: 0.3,
      });

      const line = new THREE.Line(lineGeometry, lineMaterial);
      line.rotation.y = (lon * Math.PI) / 180;

      linesGroup.add(line);
    }

    scene.add(linesGroup);

    // Add glow effect
    const glowGeometry = new THREE.SphereGeometry(1.05, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    // Color palette for connections and dots
    const colorPalette = [
      0x10b981, // Green
      0x8b5cf6, // Purple
      0xec4899, // Pink
      0x3b82f6, // Blue
      0xf59e0b, // Orange
      0x06b6d4, // Cyan
      0xe11d48, // Red
      0x84cc16, // Lime
      0xf97316, // Orange Red
      0x6366f1, // Indigo
    ];

    // Add circular orbital dots with varied sizes
    const orbitalDotsGroup = new THREE.Group();
    const orbitalDots = [];

    // Create orbital dots that move in circles around the globe
    for (let i = 0; i < 25; i++) {
      const dotSize = 0.005 + Math.random() * 0.015; // Much more varied sizes (0.005 to 0.02)
      const color =
        colorPalette[Math.floor(Math.random() * colorPalette.length)];

      const dotGeometry = new THREE.SphereGeometry(dotSize, 8, 8);
      const dotMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.8,
      });

      const dot = new THREE.Mesh(dotGeometry, dotMaterial);

      // Add glow effect with size proportional to dot
      const glowGeometry = new THREE.SphereGeometry(dotSize * 3, 8, 8);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.2,
      });
      const dotGlow = new THREE.Mesh(glowGeometry, glowMaterial);
      dot.add(dotGlow);

      orbitalDotsGroup.add(dot);

      // Store orbital animation data
      orbitalDots.push({
        dot: dot,
        glow: dotGlow,
        radius: 1.1 + Math.random() * 0.4, // Distance from center (1.1 to 1.5)
        speed: 0.005 + Math.random() * 0.015, // Orbital speed
        angle: Math.random() * Math.PI * 2, // Starting angle
        inclination: (Math.random() - 0.5) * Math.PI * 0.8, // Orbital inclination
        phase: Math.random() * Math.PI * 2, // For up/down movement
        verticalSpeed: 0.003 + Math.random() * 0.007, // Speed of vertical oscillation
        opacity: dotMaterial,
        glowOpacity: glowMaterial,
        baseSize: dotSize,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    scene.add(orbitalDotsGroup);

    // Add connection lines with moving dots
    const connectionGroup = new THREE.Group();
    const movingDots = [];

    const createConnectionLine = (lat1, lon1, lat2, lon2, colorIndex) => {
      const color = colorPalette[colorIndex % colorPalette.length];

      const phi1 = (90 - lat1) * (Math.PI / 180);
      const theta1 = (lon1 + 180) * (Math.PI / 180);
      const phi2 = (90 - lat2) * (Math.PI / 180);
      const theta2 = (lon2 + 180) * (Math.PI / 180);

      const point1 = new THREE.Vector3(
        -(1.02 * Math.sin(phi1) * Math.cos(theta1)),
        1.02 * Math.cos(phi1),
        1.02 * Math.sin(phi1) * Math.sin(theta1)
      );

      const point2 = new THREE.Vector3(
        -(1.02 * Math.sin(phi2) * Math.cos(theta2)),
        1.02 * Math.cos(phi2),
        1.02 * Math.sin(phi2) * Math.sin(theta2)
      );

      const curve = new THREE.QuadraticBezierCurve3(
        point1,
        point1.clone().add(point2).multiplyScalar(0.7),
        point2
      );

      const points = curve.getPoints(50);
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

      const lineMaterial = new THREE.LineBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.4,
      });

      const line = new THREE.Line(lineGeometry, lineMaterial);

      // Create moving dots for this connection with very varied sizes
      const dotsGroup = new THREE.Group();
      const numberOfDots = 3 + Math.floor(Math.random() * 4); // 3-6 dots per connection

      for (let i = 0; i < numberOfDots; i++) {
        const dotSize = 0.004 + Math.random() * 0.012; // Very varied sizes (0.004 to 0.016)
        const dotGeometry = new THREE.SphereGeometry(dotSize, 8, 8);
        const dotMaterial = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.9,
        });

        const dot = new THREE.Mesh(dotGeometry, dotMaterial);

        // Add glow effect proportional to size
        const glowGeometry = new THREE.SphereGeometry(dotSize * 2.5, 8, 8);
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.3,
        });
        const dotGlow = new THREE.Mesh(glowGeometry, glowMaterial);
        dot.add(dotGlow);

        dotsGroup.add(dot);

        // Store animation data with varied speeds and delays
        movingDots.push({
          dot: dot,
          glow: dotGlow,
          curve: curve,
          progress: i / numberOfDots + Math.random() * 0.5,
          speed: 0.002 + Math.random() * 0.008, // Varied speeds
          direction: Math.random() > 0.5 ? 1 : -1, // Random initial direction
          opacity: dotMaterial,
          glowOpacity: glowMaterial,
          color: color,
          baseSize: dotSize,
          pulsePhase: Math.random() * Math.PI * 2, // For pulsing effect
        });
      }

      return { line, dotsGroup };
    };

    // Add more connection lines with different colors
    const connections = [
      createConnectionLine(40, -74, 51, 0, 0), // NY to London - Green
      createConnectionLine(35, 139, -33, 151, 1), // Tokyo to Sydney - Purple
      createConnectionLine(1, 103, 19, -99, 2), // Singapore to Mexico - Pink
      createConnectionLine(55, 37, -26, 28, 3), // Moscow to Johannesburg - Blue
      createConnectionLine(48, 2, 40, -74, 4), // Paris to NY - Orange
      createConnectionLine(-23, -43, 35, 139, 5), // Rio to Tokyo - Cyan
      createConnectionLine(52, 13, 1, 103, 6), // Berlin to Singapore - Red
      createConnectionLine(-34, 151, 55, 37, 7), // Sydney to Moscow - Lime
      createConnectionLine(25, 121, 48, 2, 8), // Taipei to Paris - Orange Red
      createConnectionLine(39, 116, -23, -43, 9), // Beijing to Rio - Indigo
      createConnectionLine(22, 114, 52, 13, 0), // Hong Kong to Berlin - Green
      createConnectionLine(28, 77, 25, 121, 1), // Delhi to Taipei - Purple
    ];

    connections.forEach(({ line, dotsGroup }) => {
      connectionGroup.add(line);
      connectionGroup.add(dotsGroup);
    });

    scene.add(connectionGroup);

    // Add floating data particles around globe with more colors
    const dataParticles = [];
    const particleGroup = new THREE.Group();

    for (let i = 0; i < 80; i++) {
      // Increased number of particles
      const particleGeometry = new THREE.SphereGeometry(
        0.002 + Math.random() * 0.003,
        6,
        6
      );
      const particleColor =
        colorPalette[Math.floor(Math.random() * colorPalette.length)];
      const particleMaterial = new THREE.MeshBasicMaterial({
        color: particleColor,
        transparent: true,
        opacity: 0.6 + Math.random() * 0.4,
      });

      const particle = new THREE.Mesh(particleGeometry, particleMaterial);

      // Random position on sphere surface
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const radius = 1.15 + Math.random() * 0.4;

      particle.position.set(
        radius * Math.sin(theta) * Math.cos(phi),
        radius * Math.cos(theta),
        radius * Math.sin(theta) * Math.sin(phi)
      );

      particleGroup.add(particle);
      dataParticles.push({
        mesh: particle,
        speed: 0.001 + Math.random() * 0.004,
        axis: new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ).normalize(),
        pulsePhase: Math.random() * Math.PI * 2,
        originalOpacity: particleMaterial.opacity,
      });
    }

    scene.add(particleGroup);

    camera.position.z = 2.5;

    sceneRef.current = {
      scene,
      camera,
      renderer,
      globe,
      glow,
      continentGroup,
      linesGroup,
      connectionGroup,
      movingDots,
      orbitalDots,
      orbitalDotsGroup,
      dataParticles,
      particleGroup,
    };
    rendererRef.current = renderer;

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      // Rotate globe and elements
      globe.rotation.y += 0.003;
      continentGroup.rotation.y += 0.003;
      linesGroup.rotation.y += 0.003;
      connectionGroup.rotation.y += 0.003;
      glow.rotation.y -= 0.002;
      particleGroup.rotation.y += 0.001;
      orbitalDotsGroup.rotation.y += 0.002;

      // Animate orbital dots moving in circles
      orbitalDots.forEach((orbitalData) => {
        orbitalData.angle += orbitalData.speed;
        orbitalData.phase += orbitalData.verticalSpeed;

        // Calculate position on circular orbit with inclination
        const x =
          orbitalData.radius *
          Math.cos(orbitalData.angle) *
          Math.cos(orbitalData.inclination);
        const y =
          orbitalData.radius * Math.sin(orbitalData.phase) * 0.3 +
          orbitalData.radius *
            Math.sin(orbitalData.angle) *
            Math.sin(orbitalData.inclination);
        const z =
          orbitalData.radius *
          Math.sin(orbitalData.angle) *
          Math.cos(orbitalData.inclination);

        orbitalData.dot.position.set(x, y, z);

        // Size pulsing effect based on base size
        const pulseIntensity =
          Math.sin(time * 2 + orbitalData.pulsePhase) * 0.4 + 1;
        const sizeMultiplier = orbitalData.baseSize * 50; // Scale factor for visibility
        orbitalData.dot.scale.setScalar(pulseIntensity * sizeMultiplier);

        // Opacity variation
        const opacityPulse =
          Math.sin(time * 1.5 + orbitalData.pulsePhase) * 0.3 + 0.7;
        orbitalData.opacity.opacity = opacityPulse;
        orbitalData.glowOpacity.opacity = opacityPulse * 0.4;
      });

      // Animate moving dots along connection lines with back-and-forth motion
      movingDots.forEach((dotData) => {
        dotData.progress += dotData.speed * dotData.direction;

        // Reverse direction when reaching ends
        if (dotData.progress >= 1) {
          dotData.progress = 1;
          dotData.direction = -1;
        } else if (dotData.progress <= 0) {
          dotData.progress = 0;
          dotData.direction = 1;
        }

        // Always show dot since it's always between 0 and 1
        const position = dotData.curve.getPoint(dotData.progress);
        dotData.dot.position.copy(position);

        // Enhanced fade effect based on position (fade near ends)
        const distanceFromCenter = Math.abs(dotData.progress - 0.5) * 2; // 0 at center, 1 at ends
        const baseOpacity = 1 - distanceFromCenter * 0.3; // Fade 30% at ends

        // Pulsing effect
        const pulseIntensity =
          Math.sin(time * 3 + dotData.pulsePhase) * 0.3 + 0.7;
        dotData.opacity.opacity = baseOpacity * pulseIntensity;
        dotData.glowOpacity.opacity = baseOpacity * pulseIntensity * 0.5;

        // Scale pulsing with speed variation and base size
        const speedScale = Math.abs(dotData.direction) * 0.2 + 0.8; // Slightly bigger when moving
        const sizeMultiplier = dotData.baseSize * 80; // Scale factor based on base size
        const scale =
          (speedScale + Math.sin(time * 4 + dotData.pulsePhase) * 0.3) *
          sizeMultiplier;
        dotData.dot.scale.setScalar(scale);

        dotData.dot.visible = true;
      });

      // Animate floating data particles with enhanced effects
      dataParticles.forEach((particleData) => {
        particleData.mesh.rotateOnAxis(particleData.axis, particleData.speed);

        // Enhanced pulsing effect
        const pulseIntensity =
          Math.sin(time * 2 + particleData.pulsePhase) * 0.4 + 0.6;
        const scale = 1 + Math.sin(time * 3 + particleData.pulsePhase) * 0.5;

        particleData.mesh.scale.setScalar(scale);
        particleData.mesh.material.opacity =
          particleData.originalOpacity * pulseIntensity;

        // Subtle floating movement
        particleData.mesh.position.y +=
          Math.sin(time + particleData.pulsePhase) * 0.0005;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={className} />;
};

// Animated Section Component
const AnimatedSection = ({ className, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-1000 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Main Contact Section Component
const ContactSection = () => {
  const handlePhoneCall = () => {
    // Mở ứng dụng điện thoại trên mobile hoặc hiển thị số điện thoại
    window.location.href = 'tel:0889881010';
  };

  const handleChatClick = () => {
    window.open('https://zalo.me/0889881010', '_blank');
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
        {/* Globe Background Effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative">
            <Globe className="opacity-20" />
            {/* Additional glow effects */}
            <div className="absolute inset-0 bg-gradient-radial from-blue-400/20 via-purple-400/10 to-transparent rounded-full blur-3xl scale-150"></div>
          </div>
        </div>

        {/* Enhanced floating particles with more colors */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => {
            const colors = [
              'bg-green-400',
              'bg-purple-400',
              'bg-pink-400',
              'bg-blue-400',
              'bg-orange-400',
            ];
            const randomColor =
              colors[Math.floor(Math.random() * colors.length)];
            return (
              <div
                key={i}
                className={`absolute w-1 h-1 ${randomColor} rounded-full opacity-40 animate-pulse`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              />
            );
          })}
        </div>

        <div className="container px-4 md:px-6">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <Badge variant="blue" className="mb-4">
              Liên hệ với chúng tôi
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Sẵn sàng hỗ trợ
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}
                24/7
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng tư vấn và hỗ trợ
              bạn tìm ra giải pháp công nghệ tối ưu nhất cho doanh nghiệp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handlePhoneCall}
                className="bg-blue-600 text-white text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Phone className="mr-2 h-4 w-4" />
                Gọi ngay: 0889 881 010
              </Button>
              <Button size="lg" onClick={handleChatClick} variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat trực tuyến
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Additional CSS for gradient radial */}
      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </>
  );
};

export default ContactSection;
