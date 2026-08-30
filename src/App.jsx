import { useState } from 'react'
import './App.css'

const preguntas = {
  'Atención al cliente': [
    'Háblame sobre ti y tu experiencia en atención al cliente.',
    '¿Cómo atenderías a un cliente que está molesto?',
    '¿Cuál consideras que es la clave para brindar un buen servicio?',
    'Cuéntame una situación en la que hayas solucionado un problema de un cliente.',
    '¿Por qué deberíamos contratarte para este puesto?'
  ],

  'Tecnología': [
    'Háblame sobre ti y tu experiencia relacionada con tecnología.',
    '¿Qué herramientas o lenguajes de programación conoces?',
    '¿Cómo solucionarías un error en una aplicación?',
    'Cuéntame sobre un proyecto tecnológico en el que hayas trabajado.',
    '¿Por qué consideras que eres una buena opción para este puesto?'
  ],

  'Administración': [
    'Háblame sobre ti y tu experiencia en administración.',
    '¿Cómo organizas tus tareas cuando tienes varias actividades pendientes?',
    '¿Cómo manejarías información confidencial de una empresa?',
    'Cuéntame una situación en la que hayas tenido que resolver un problema.',
    '¿Por qué deberíamos contratarte?'
  ],

  'Ventas': [
    'Háblame sobre ti y tu experiencia en ventas.',
    '¿Cómo convencerías a un cliente de adquirir un producto?',
    '¿Qué harías si un cliente rechaza tu propuesta?',
    '¿Cómo estableces una buena relación con los clientes?',
    '¿Por qué consideras que eres bueno para las ventas?'
  ]
}

function App() {
  const [nombre, setNombre] = useState('')
  const [categoria, setCategoria] = useState('')

  const [pantalla, setPantalla] = useState('inicio')

  const [preguntaActual, setPreguntaActual] = useState(0)
  const [respuesta, setRespuesta] = useState('')
  const [respuestas, setRespuestas] = useState([])

  const [puntaje, setPuntaje] = useState(0)
  const [historial, setHistorial] = useState([])

  const iniciarEntrevista = () => {
    if (!nombre.trim()) {
      alert('Por favor escribe tu nombre.')
      return
    }

    if (!categoria) {
      alert('Por favor selecciona una categoría.')
      return
    }

    setPreguntaActual(0)
    setRespuesta('')
    setRespuestas([])
    setPuntaje(0)
    setPantalla('entrevista')
  }

  const calcularPuntaje = (listaRespuestas) => {
    let puntos = 0

    listaRespuestas.forEach((respuestaUsuario) => {
      const cantidadPalabras = respuestaUsuario
        .trim()
        .split(/\s+/)
        .filter(Boolean).length

      if (cantidadPalabras >= 30) {
        puntos += 20
      } else if (cantidadPalabras >= 15) {
        puntos += 15
      } else if (cantidadPalabras >= 5) {
        puntos += 10
      } else {
        puntos += 5
      }
    })

    return puntos
  }

  const siguientePregunta = () => {
    if (!respuesta.trim()) {
      alert('Escribe una respuesta antes de continuar.')
      return
    }

    const nuevasRespuestas = [...respuestas, respuesta]
    setRespuestas(nuevasRespuestas)

    const totalPreguntas = preguntas[categoria].length

    if (preguntaActual < totalPreguntas - 1) {
      setPreguntaActual(preguntaActual + 1)
      setRespuesta('')
    } else {
      const resultado = calcularPuntaje(nuevasRespuestas)

      const nuevaEntrevista = {
        categoria: categoria,
        puntaje: resultado,
        fecha: new Date().toLocaleDateString('es-CO'),
        preguntas: nuevasRespuestas.length
      }

      setPuntaje(resultado)
      setHistorial([...historial, nuevaEntrevista])
      setPantalla('resultado')
    }
  }

  const nivel = () => {
    if (puntaje >= 80) {
      return 'Excelente desempeño'
    }

    if (puntaje >= 60) {
      return 'Buen desempeño'
    }

    return 'Necesita mejorar'
  }

  const recomendacion = () => {
    if (puntaje >= 80) {
      return 'Excelente trabajo. Tus respuestas fueron completas. Continúa practicando para mantener este nivel y fortalecer tus habilidades.'
    }

    if (puntaje >= 60) {
      return 'Tu desempeño es bueno. Practica un poco más para mejorar la claridad, seguridad y profundidad de tus respuestas.'
    }

    return 'Te recomendamos practicar nuevamente. Intenta elaborar respuestas más completas, detalladas y relacionadas con la pregunta.'
  }

  const volverInicio = () => {
    setPantalla('inicio')
    setPreguntaActual(0)
    setRespuesta('')
    setRespuestas([])
  }

  const abrirPerfil = () => {
    setPantalla('perfil')
  }

  const abrirHistorial = () => {
    setPantalla('historial')
  }

  // =========================
  // PERFIL
  // =========================

  if (pantalla === 'perfil') {
    const ultimoResultado =
      historial.length > 0
        ? historial[historial.length - 1]
        : null

    return (
      <div className="app">

        <header className="header">
          <div className="logo">
            <span className="logo-icon">💼</span>
            <span>TalentPrep</span>
          </div>

          <nav>
            <button onClick={volverInicio}>Inicio</button>
            <button onClick={abrirHistorial}>Historial</button>
          </nav>
        </header>

        <main className="profile-screen">

          <div className="profile-card">

            <div className="profile-avatar">
              👤
            </div>

            <h1>Mi perfil</h1>

            <p className="profile-welcome">
              Información de tu práctica en TalentPrep
            </p>

            <div className="profile-info">

              <div className="profile-item">
                <span>👤</span>

                <div>
                  <strong>Nombre</strong>
                  <p>{nombre || 'Aún no registrado'}</p>
                </div>
              </div>

              <div className="profile-item">
                <span>🎯</span>

                <div>
                  <strong>Última categoría</strong>
                  <p>
                    {ultimoResultado?.categoria ||
                      categoria ||
                      'Aún no seleccionada'}
                  </p>
                </div>
              </div>

              <div className="profile-item">
                <span>📊</span>

                <div>
                  <strong>Último puntaje</strong>
                  <p>
                    {ultimoResultado
                      ? `${ultimoResultado.puntaje}/100`
                      : 'Sin resultados'}
                  </p>
                </div>
              </div>

              <div className="profile-item">
                <span>📝</span>

                <div>
                  <strong>Entrevistas realizadas</strong>
                  <p>{historial.length}</p>
                </div>
              </div>

            </div>

            <button className="primary-button" onClick={volverInicio}>
              ← Volver al inicio
            </button>

          </div>

        </main>

        <footer>
          <p>© 2026 TalentPrep - Simulador de Entrevistas</p>
        </footer>

      </div>
    )
  }

  // =========================
  // HISTORIAL
  // =========================

  if (pantalla === 'historial') {
    return (
      <div className="app">

        <header className="header">
          <div className="logo">
            <span className="logo-icon">💼</span>
            <span>TalentPrep</span>
          </div>

          <nav>
            <button onClick={volverInicio}>Inicio</button>
            <button onClick={abrirPerfil}>Mi perfil</button>
          </nav>
        </header>

        <main className="history-screen">

          <div className="history-container">

            <div className="history-title">
              <span>📋</span>

              <div>
                <h1>Historial de entrevistas</h1>

                <p>
                  Consulta los resultados de tus prácticas anteriores.
                </p>
              </div>
            </div>

            {historial.length === 0 ? (

              <div className="empty-history">
                <div>📭</div>

                <h2>No tienes entrevistas todavía</h2>

                <p>
                  Realiza tu primera entrevista para comenzar a guardar
                  tus resultados.
                </p>

                <button
                  className="primary-button"
                  onClick={volverInicio}
                >
                  Comenzar entrevista
                </button>
              </div>

            ) : (

              <div className="history-list">

                {historial.map((entrevista, index) => (

                  <div className="history-card" key={index}>

                    <div className="history-icon">
                      🎯
                    </div>

                    <div className="history-details">

                      <h3>
                        {entrevista.categoria}
                      </h3>

                      <p>
                        📅 {entrevista.fecha}
                      </p>

                      <p>
                        📝 {entrevista.preguntas} preguntas respondidas
                      </p>

                    </div>

                    <div className="history-score">

                      <strong>
                        {entrevista.puntaje}/100
                      </strong>

                      <span
                        className={
                          entrevista.puntaje >= 80
                            ? 'excellent'
                            : entrevista.puntaje >= 60
                            ? 'good'
                            : 'needs'
                        }
                      >
                        {entrevista.puntaje >= 80
                          ? 'Excelente'
                          : entrevista.puntaje >= 60
                          ? 'Buen desempeño'
                          : 'Necesita mejorar'}
                      </span>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </main>

        <footer>
          <p>© 2026 TalentPrep - Simulador de Entrevistas</p>
        </footer>

      </div>
    )
  }

  // =========================
  // RESULTADO
  // =========================

  if (pantalla === 'resultado') {
    return (
      <div className="app">

        <header className="header">

          <div className="logo">
            <span className="logo-icon">💼</span>
            <span>TalentPrep</span>
          </div>

          <nav>
            <button onClick={volverInicio}>
              Inicio
            </button>

            <button onClick={abrirPerfil}>
              Mi perfil
            </button>
          </nav>

        </header>

        <main className="result-screen">

          <div className="result-card">

            <div className="result-icon">
              🎉
            </div>

            <h1>
              ¡Entrevista completada!
            </h1>

            <p className="result-message">
              Felicitaciones, <strong>{nombre}</strong>.
              Has terminado tu práctica de entrevista para el área de{' '}
              <strong>{categoria}</strong>.
            </p>

            <div className="score-circle">
              <strong>{puntaje}</strong>
              <span>/100</span>
            </div>

            <div className="level-box">

              <span>Nivel de desempeño</span>

              <strong>
                {nivel()}
              </strong>

            </div>

            <div className="recommendation">

              <h3>
                💡 Recomendación
              </h3>

              <p>
                {recomendacion()}
              </p>

            </div>

            <div className="result-info">

              <div>
                <strong>
                  {respuestas.length}
                </strong>

                <span>
                  Preguntas respondidas
                </span>
              </div>

              <div>
                <strong>
                  {puntaje}/100
                </strong>

                <span>
                  Puntaje obtenido
                </span>
              </div>

              <div>
                <strong>
                  {historial.length}
                </strong>

                <span>
                  Entrevistas realizadas
                </span>
              </div>

            </div>

            <div className="result-buttons">

              <button
                className="primary-button"
                onClick={volverInicio}
              >
                Volver al inicio
              </button>

              <button
                className="secondary-button"
                onClick={abrirHistorial}
              >
                📋 Ver historial
              </button>

            </div>

          </div>

        </main>

        <footer>
          <p>
            © 2026 TalentPrep - Simulador de Entrevistas
          </p>
        </footer>

      </div>
    )
  }

  // =========================
  // ENTREVISTA
  // =========================

  if (pantalla === 'entrevista') {

    const listaPreguntas = preguntas[categoria]

    const pregunta = listaPreguntas[preguntaActual]

    const progreso =
      ((preguntaActual + 1) / listaPreguntas.length) * 100

    return (
      <div className="app">

        <header className="header">

          <div className="logo">
            <span className="logo-icon">💼</span>
            <span>TalentPrep</span>
          </div>

          <div className="interview-user">
            👤 {nombre}
          </div>

        </header>

        <main className="interview-screen">

          <div className="interview-container">

            <div className="interview-top">

              <span>
                Entrevista de {categoria}
              </span>

              <span>
                Pregunta {preguntaActual + 1} de{' '}
                {listaPreguntas.length}
              </span>

            </div>

            <div className="progress-bar">

              <div
                className="progress"
                style={{
                  width: `${progreso}%`
                }}
              ></div>

            </div>

            <div className="question-card">

              <div className="question-number">
                Pregunta {preguntaActual + 1}
              </div>

              <h1>
                {pregunta}
              </h1>

              <p>
                Responde como si estuvieras frente a un
                entrevistador real.
              </p>

              <textarea
                value={respuesta}
                onChange={(e) =>
                  setRespuesta(e.target.value)
                }
                placeholder="Escribe aquí tu respuesta..."
                rows="8"
              ></textarea>

              <div className="word-counter">
                Palabras:
                {' '}
                {respuesta.trim()
                  ? respuesta.trim().split(/\s+/).length
                  : 0}
              </div>

              <button
                className="primary-button"
                onClick={siguientePregunta}
              >
                {preguntaActual === listaPreguntas.length - 1
                  ? 'Finalizar entrevista ✓'
                  : 'Siguiente pregunta →'}
              </button>

            </div>

            <button
              className="exit-button"
              onClick={volverInicio}
            >
              ← Salir de la entrevista
            </button>

          </div>

        </main>

      </div>
    )
  }

  // =========================
  // INICIO
  // =========================

  return (
    <div className="app">

      <header className="header">

        <div className="logo">
          <span className="logo-icon">
            💼
          </span>

          <span>
            TalentPrep
          </span>
        </div>

        <nav>

          <button onClick={volverInicio}>
            Inicio
          </button>

          <button
            onClick={abrirHistorial}
          >
            Historial
          </button>

          <button
            onClick={abrirPerfil}
          >
            Mi perfil
          </button>

        </nav>

      </header>

      <main>

        <section
          id="inicio"
          className="hero-section"
        >

          <div className="hero-content">

            <p className="welcome">
              BIENVENIDO A TALENTPREP
            </p>

            <h1>
              Prepárate para tu
              <span>
                {' '}próxima entrevista
              </span>
            </h1>

            <p className="description">
              Practica entrevistas laborales, mejora tus
              respuestas y aumenta tu confianza para conseguir
              el trabajo que deseas.
            </p>

            <div
              className="form-card"
              id="entrevista"
            >

              <h2>
                Comencemos tu práctica
              </h2>

              <label>
                Tu nombre
              </label>

              <input
                type="text"
                placeholder="Escribe tu nombre"
                value={nombre}
                onChange={(e) =>
                  setNombre(e.target.value)
                }
              />

              <label>
                Selecciona una categoría
              </label>

              <select
                value={categoria}
                onChange={(e) =>
                  setCategoria(e.target.value)
                }
              >

                <option value="">
                  Selecciona una opción
                </option>

                <option value="Atención al cliente">
                  Atención al cliente
                </option>

                <option value="Tecnología">
                  Tecnología
                </option>

                <option value="Administración">
                  Administración
                </option>

                <option value="Ventas">
                  Ventas
                </option>

              </select>

              <button
                className="primary-button"
                onClick={iniciarEntrevista}
              >
                Iniciar entrevista →
              </button>

            </div>

          </div>

          <div className="hero-image">

            <div className="interview-card">

              <div className="person">
                👨‍💼
              </div>

              <div className="speech">

                <strong>
                  ¡Prepárate!
                </strong>

                <p>
                  Tu próxima oportunidad
                  comienza aquí.
                </p>

              </div>

            </div>

          </div>

        </section>

        <section className="features">

          <h2>
            ¿Por qué usar TalentPrep?
          </h2>

          <div className="feature-container">

            <div className="feature">

              <div className="feature-icon">
                🎯
              </div>

              <h3>
                Practica
              </h3>

              <p>
                Simula preguntas reales de
                entrevistas laborales.
              </p>

            </div>

            <div className="feature">

              <div className="feature-icon">
                📊
              </div>

              <h3>
                Evalúa
              </h3>

              <p>
                Conoce tus resultados y descubre
                qué puedes mejorar.
              </p>

            </div>

            <div className="feature">

              <div className="feature-icon">
                🚀
              </div>

              <h3>
                Mejora
              </h3>

              <p>
                Aumenta tu confianza y prepárate
                para nuevas oportunidades.
              </p>

            </div>

          </div>

        </section>

      </main>

      <footer>

        <p>
          © 2026 TalentPrep - Simulador de Entrevistas
        </p>

      </footer>

    </div>
  )
}

export default App