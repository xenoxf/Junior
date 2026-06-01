import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skills } from '../../lib/skills'
import type { Skill } from '../../types'
import styles from './Skills.module.css'

const categories = [
  { id: 'all', label: 'Todas' },
  { id: 'language', label: 'Lenguajes' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Bases de datos' },
  { id: 'tool', label: 'Herramientas' },
  { id: 'desktop', label: 'Desktop' },
]

const levelClass: Record<string, string> = {
  core: styles.levelCore,
  strong: styles.levelStrong,
  learning: styles.levelLearning,
}

const levelLabel: Record<string, string> = {
  core: 'Core',
  strong: 'Avanzado',
  learning: 'Explorando',
}

export default function SkillsSection() {
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? skills
    : skills.filter((s) => s.category === active)

  return (
    <section className="section" id="skills">
      <div className={styles.wrapper}>
        <div className="section-label">Stack</div>
        <h2 className="section-title">Tecnologías que uso</h2>
        <p className="section-subtitle">
          <span className={styles.highlight}>TypeScript</span> y{' '}
          <span className={styles.highlight}>JavaScript</span> son mi ecosistema principal.
          El resto los exploro activamente por curiosidad técnica.
        </p>
      </div>

      <div className={styles.filters}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={`${styles.filterBtn} ${active === cat.id ? styles.filterBtnActive : ''}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        <AnimatePresence mode="popLayout">
          {filtered.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={styles.card}
    >
      <img
        src={skill.icon}
        alt={skill.name}
        className={styles.icon}
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        loading="lazy"
      />
      <span className={styles.name}>{skill.name}</span>
      <span className={`${styles.level} ${levelClass[skill.mastery]}`}>
        {levelLabel[skill.mastery]}
      </span>
    </motion.div>
  )
}
