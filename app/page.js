'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

const projects = [
  { id: 1, name: 'Bedroom Sessions', client: 'Artist Name', type: 'Photography', year: '2024', width: 280, row: 1, images: ['/projects/p1.svg'] },
  { id: 2, name: 'Brand Icons', client: 'EXP Internal', type: 'Branding', year: '2024', width: 200, row: 1, images: ['/projects/p2.svg'] },
  { id: 3, name: 'Shadow Portrait', client: 'Editorial Mag', type: 'Editorial', year: '2023', width: 240, row: 1, images: ['/projects/p3.svg'] },
  { id: 4, name: 'Peace On Earth', client: 'POE Foundation', type: 'Campaign', year: '2023', width: 260, row: 1, images: ['/projects/p4.svg'] },
  { id: 5, name: 'Streetwear Drop', client: 'Brand Co', type: 'Fashion', year: '2024', width: 250, row: 1, images: ['/projects/p5.svg'] },
  { id: 6, name: 'Chromatic', client: 'Dye Studio', type: 'Art Direction', year: '2023', width: 280, row: 1, images: ['/projects/p6.svg'] },
  { id: 7, name: 'After Dark', client: 'Night Gallery', type: 'Photography', year: '2024', width: 240, row: 2, images: ['/projects/p7.svg'] },
  { id: 8, name: 'Spectrum Jacket', client: 'Atelier X', type: 'Fashion', year: '2023', width: 220, row: 2, images: ['/projects/p8.svg'] },
  { id: 9, name: 'Charger', client: 'Beverage Co', type: 'Product', year: '2024', width: 270, row: 2, images: ['/projects/p9.svg', '/projects/p10.svg'] },
  { id: 10, name: 'Glitch Series', client: 'Digital Arts', type: 'Art Direction', year: '2023', width: 200, row: 2, images: ['/projects/p10.svg'] },
  { id: 11, name: 'Bloom', client: 'Beauty Brand', type: 'Campaign', year: '2024', width: 260, row: 2, images: ['/projects/p11.svg'] },
  { id: 12, name: 'Terra', client: 'Eco Collective', type: 'Branding', year: '2023', width: 240, row: 2, images: ['/projects/p12.svg'] },
  { id: 13, name: 'Mosaic', client: 'Gallery Show', type: 'Editorial', year: '2024', width: 230, row: 2, images: ['/projects/p13.svg'] },
]

const tableData = [
  { category: 'End Client', value: 'Project Name', year: '2020' },
  { category: 'Craft', value: 'Project Rating', year: '2020' },
  { category: 'Type', value: 'Name of file project', year: '2020' },
  { category: 'Lens', value: 'What area of the project', year: '2020' },
  { category: 'Year', value: 'year', year: '2020' },
  { category: 'Category', value: 'Project', year: '2020' },
  { category: 'Campaign', value: 'Project Art & Frameworks', year: '2020' },
  { category: 'Discipline', value: 'Photography', year: '2020' },
  { category: 'Artist', value: 'Processes/web', year: '2020' },
  { category: 'Role', value: 'Art Direction & Creative D', year: '2020' },
]

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeTableRow, setActiveTableRow] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [row1Paused, setRow1Paused] = useState(false)
  const [row2Paused, setRow2Paused] = useState(false)

  const row1Ref = useRef(null)
  const row2Ref = useRef(null)
  const row1AnimRef = useRef(null)
  const row2AnimRef = useRef(null)
  const row1PosRef = useRef(0)
  const row2PosRef = useRef(0)
  const row1PausedRef = useRef(false)
  const row2PausedRef = useRef(false)

  const row1Projects = projects.filter(p => p.row === 1)
  const row2Projects = projects.filter(p => p.row === 2)

  const row1Items = [...row1Projects, ...row1Projects, ...row1Projects]
  const row2Items = [...row2Projects, ...row2Projects, ...row2Projects]

  const gap = 8
  const row1SetWidth = row1Projects.reduce((sum, p) => sum + p.width, 0) + row1Projects.length * gap
  const row2SetWidth = row2Projects.reduce((sum, p) => sum + p.width, 0) + row2Projects.length * gap

  // Auto-scroll
  useEffect(() => {
    const speed = 0.4

    function animateRow1() {
      if (!row1PausedRef.current && row1Ref.current) {
        row1PosRef.current -= speed
        if (Math.abs(row1PosRef.current) >= row1SetWidth) row1PosRef.current += row1SetWidth
        row1Ref.current.style.transform = `translateX(${row1PosRef.current}px)`
      }
      row1AnimRef.current = requestAnimationFrame(animateRow1)
    }

    function animateRow2() {
      if (!row2PausedRef.current && row2Ref.current) {
        row2PosRef.current += speed
        if (row2PosRef.current >= 0) row2PosRef.current -= row2SetWidth
        row2Ref.current.style.transform = `translateX(${row2PosRef.current}px)`
      }
      row2AnimRef.current = requestAnimationFrame(animateRow2)
    }

    row2PosRef.current = -row2SetWidth
    row1AnimRef.current = requestAnimationFrame(animateRow1)
    row2AnimRef.current = requestAnimationFrame(animateRow2)

    return () => {
      cancelAnimationFrame(row1AnimRef.current)
      cancelAnimationFrame(row2AnimRef.current)
    }
  }, [row1SetWidth, row2SetWidth])

  // Manual scroll via wheel
  useEffect(() => {
    function handleWheel1(e) {
      e.preventDefault()
      const delta = e.deltaX || e.deltaY
      row1PosRef.current -= delta * 0.5
      if (Math.abs(row1PosRef.current) >= row1SetWidth) row1PosRef.current += row1SetWidth
      else if (row1PosRef.current > 0) row1PosRef.current -= row1SetWidth
      if (row1Ref.current) row1Ref.current.style.transform = `translateX(${row1PosRef.current}px)`
    }
    function handleWheel2(e) {
      e.preventDefault()
      const delta = e.deltaX || e.deltaY
      row2PosRef.current -= delta * 0.5
      if (row2PosRef.current >= 0) row2PosRef.current -= row2SetWidth
      else if (Math.abs(row2PosRef.current) >= row2SetWidth * 2) row2PosRef.current += row2SetWidth
      if (row2Ref.current) row2Ref.current.style.transform = `translateX(${row2PosRef.current}px)`
    }
    const r1 = document.getElementById('row1')
    const r2 = document.getElementById('row2')
    if (r1) r1.addEventListener('wheel', handleWheel1, { passive: false })
    if (r2) r2.addEventListener('wheel', handleWheel2, { passive: false })
    return () => {
      if (r1) r1.removeEventListener('wheel', handleWheel1)
      if (r2) r2.removeEventListener('wheel', handleWheel2)
    }
  }, [row1SetWidth, row2SetWidth])

  const pauseRow1 = () => { row1PausedRef.current = true; setRow1Paused(true) }
  const resumeRow1 = () => { row1PausedRef.current = false; setRow1Paused(false) }
  const pauseRow2 = () => { row2PausedRef.current = true; setRow2Paused(true) }
  const resumeRow2 = () => { row2PausedRef.current = false; setRow2Paused(false) }

  const handleProjectClick = (project) => {
    if (selectedProject && selectedProject.id === project.id) {
      setSelectedProject(null)
      return
    }
    setSelectedProject(project)
    setCurrentImageIndex(0)
  }

  const closeDetail = () => setSelectedProject(null)

  const getItemClass = (project) => {
    let cls = 'project-item'
    if (selectedProject) {
      cls += selectedProject.id === project.id ? ' selected' : ' dimmed'
    }
    return cls
  }

  const renderProjectItem = (project, keyPrefix, i) => (
    <div
      key={`${keyPrefix}-${i}`}
      className={getItemClass(project)}
      style={{ width: project.width }}
      onClick={() => handleProjectClick(project)}
    >
      <img src={project.images[0]} alt={project.name} />
      <div className="project-overlay">
        <div className="project-overlay-text">
          <h4>{project.name}</h4>
          <p>{project.client}</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="page">
      <nav className="nav">
        <a href="#home">home</a>
        <a href="#index">index</a>
        <a href="#about">about</a>
        <a href="#contact">contact</a>
      </nav>

      <div className="bounding-box">
        <div className="bounding-box-header">
          <h3>Clientele:</h3>
          <img src="/exp.svg" alt="EXP" className="bounding-box-logo" />
        </div>
        <div className="filter-table-container">
          <table className="filter-table">
            <tbody>
              {tableData.map((row, i) => (
                <tr
                  key={i}
                  className={activeTableRow === i ? 'active' : ''}
                  onClick={() => setActiveTableRow(activeTableRow === i ? null : i)}
                >
                  <td>{row.category}</td>
                  <td>{row.value}</td>
                  <td>{row.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bounding-box-footer">
          <p>EXP is a design & creative agency based in Los Angeles, CA</p>
          <a href="#contact" className="get-in-touch">GET IN TOUCH</a>
        </div>
      </div>

      <div className="project-rows">
        <div
          id="row1"
          className={`project-row${row1Paused ? ' paused' : ''}`}
          onMouseEnter={pauseRow1}
          onMouseLeave={resumeRow1}
        >
          <div className="project-row-track" ref={row1Ref}>
            {row1Items.map((p, i) => renderProjectItem(p, 'r1', i))}
          </div>
        </div>

        <div
          id="row2"
          className={`project-row${row2Paused ? ' paused' : ''}`}
          onMouseEnter={pauseRow2}
          onMouseLeave={resumeRow2}
        >
          <div className="project-row-track" ref={row2Ref}>
            {row2Items.map((p, i) => renderProjectItem(p, 'r2', i))}
          </div>
        </div>
      </div>

      <div className={`detail-panel${selectedProject ? ' open' : ''}`}>
        {selectedProject && (
          <>
            <button className="detail-panel-close" onClick={closeDetail}>&#x2715;</button>
            <div className="detail-panel-header">
              <h2>{selectedProject.name}</h2>
              <p>{selectedProject.client}</p>
            </div>
            <div className="detail-panel-image">
              <img src={selectedProject.images[currentImageIndex]} alt={selectedProject.name} />
              <div className="detail-panel-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
              </div>
            </div>
            {selectedProject.images.length > 1 && (
              <div className="image-nav">
                <button className="image-nav-arrow" onClick={() => setCurrentImageIndex(i => i > 0 ? i - 1 : selectedProject.images.length - 1)}>&#8592;</button>
                <div className="image-nav-dots">
                  {selectedProject.images.map((_, idx) => (
                    <div key={idx} className={`image-nav-dot${idx === currentImageIndex ? ' active' : ''}`} onClick={() => setCurrentImageIndex(idx)} />
                  ))}
                </div>
                <button className="image-nav-arrow" onClick={() => setCurrentImageIndex(i => i < selectedProject.images.length - 1 ? i + 1 : 0)}>&#8594;</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
