import React, { useState, useEffect, useRef } from 'react';

const TELEGRAM_BOT_TOKEN = '8672614541:AAFh3pVU9UGc9VaWrWfcTlwdq8vkZp9DMQ8';

// Componente de Calendario
const CalendarPicker = ({ onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selected >= today) {
      setSelectedDate(selected);
      const formattedDate = `${day} de ${monthNames[currentDate.getMonth()]} de ${currentDate.getFullYear()}`;
      // Enviar tanto el string formateado como el objeto Date
      onSelectDate(formattedDate, selected);
    }
  };

  const isDateDisabled = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDateSelected = (day) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear()
    );
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const calendarDays = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(
      <div
        key={day}
        className={`calendar-day ${isDateDisabled(day) ? 'disabled' : ''} ${isDateSelected(day) ? 'selected' : ''}`}
        onClick={() => !isDateDisabled(day) && handleDateClick(day)}
      >
        {day}
      </div>
    );
  }

  return (
    <div className="calendar-picker">
      <div className="calendar-header">
        <button onClick={handlePrevMonth} className="calendar-nav-btn">←</button>
        <div className="calendar-month">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
        <button onClick={handleNextMonth} className="calendar-nav-btn">→</button>
      </div>
      <div className="calendar-weekdays">
        {dayNames.map((day) => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-days">
        {calendarDays}
      </div>
    </div>
  );
};

// Componente de Selector de Hora
const TimePicker = ({ onSelectTime, selectedDate }) => {
  const [selectedTime, setSelectedTime] = useState(null);

  // Generar horarios disponibles según el día
  const getAvailableTimes = () => {
    if (!selectedDate) return [];

    // selectedDate ya es un objeto Date
    const dayOfWeek = selectedDate.getDay();
    
    let times = [];
    
    // Lunes a Viernes: 7:00 AM - 8:00 PM
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      times = [
        '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
        '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
      ];
    }
    // Sábado: 8:00 AM - 9:00 PM
    else if (dayOfWeek === 6) {
      times = [
        '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
        '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
      ];
    }
    // Domingo: 9:00 AM - 6:00 PM
    else if (dayOfWeek === 0) {
      times = [
        '9:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
        '4:00 PM', '5:00 PM', '6:00 PM'
      ];
    }

    return times;
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    onSelectTime(time);
  };

  const availableTimes = getAvailableTimes();

  return (
    <div className="time-picker">
      <div className="time-picker-header">
        <span className="time-icon">🕐</span>
        <h4>Selecciona la hora</h4>
      </div>
      <div className="time-slots">
        {availableTimes.map((time) => (
          <button
            key={time}
            className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
            onClick={() => handleTimeClick(time)}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

// Sistema de contextos conversacionales
class ConversationManager {
  constructor() {
    this.context = null;
    this.contextData = {};
  }

  setContext(contextName, data = {}) {
    this.context = contextName;
    this.contextData = { ...this.contextData, ...data };
  }

  getContext() {
    return this.context;
  }

  getContextData() {
    return this.contextData;
  }

  clearContext() {
    this.context = null;
    this.contextData = {};
  }
}

function TelegramChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: '¡Hola! 👋 Soy el asistente virtual de GreenBite Café.\n\nPuedo ayudarte con:\n📅 Reservaciones\n📋 Menú y productos\n🕐 Horarios\n📍 Ubicación\n\n¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date().toISOString(),
      quickReplies: ['Hacer una reserva', 'Ver el menú', 'Horarios', 'Ubicación']
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const conversationManager = useRef(new ConversationManager()).current;
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showCalendar, showTimePicker]);

  useEffect(() => {
    let storedChatId = localStorage.getItem('greenbite_chat_id');
    if (!storedChatId) {
      storedChatId = `web_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('greenbite_chat_id', storedChatId);
    }
    setChatId(storedChatId);
  }, []);

  const handleDateSelect = (dateFormatted, dateObject) => {
    setShowCalendar(false);
    
    const botMessage = {
      text: `Perfecto, reserva para el ${dateFormatted}. 📅`,
      sender: 'bot',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, botMessage]);
    
    conversationManager.setContext('reserva-hora', { 
      ...conversationManager.getContextData(), 
      fecha: dateFormatted,
      fechaObject: dateObject // Guardar el objeto Date también
    });
    
    setTimeout(() => {
      setShowTimePicker(true);
      const timeMessage = {
        text: '¿A qué hora prefieres tu reserva? 🕐\n\nSelecciona una hora disponible:',
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, timeMessage]);
    }, 800);
  };

  const handleTimeSelect = (time) => {
    setShowTimePicker(false);
    
    const contextData = conversationManager.getContextData();
    conversationManager.setContext('reserva-contacto', { ...contextData, hora: time });
    
    setTimeout(() => {
      const contactMessage = {
        text: `¡Genial! 🎉\n\nResumen de tu reserva:\n👥 Personas: ${contextData.personas}\n📅 Fecha: ${contextData.fecha}\n🕐 Hora: ${time}\n\nPor favor, déjame tu nombre y teléfono para confirmar la reserva.\n\nEjemplo: "Juan Pérez, 3001234567"`,
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, contactMessage]);
    }, 500);
  };

  // Sistema de intents mejorado con contextos
  const processMessage = async (message) => {
    const lowerMessage = message.toLowerCase();
    const currentContext = conversationManager.getContext();
    const contextData = conversationManager.getContextData();

    // Flujo de reserva con contexto
    if (currentContext === 'reserva-personas') {
      const numPersonas = parseInt(message);
      if (numPersonas && numPersonas > 0 && numPersonas <= 20) {
        conversationManager.setContext('reserva-fecha', { personas: numPersonas });
        setShowCalendar(true);
        return {
          text: `Perfecto, reserva para ${numPersonas} ${numPersonas === 1 ? 'persona' : 'personas'}. 👥\n\n¿Para qué fecha te gustaría reservar? 📅\n\nSelecciona un día en el calendario:`,
          quickReplies: []
        };
      } else {
        return {
          text: 'Por favor, indícame un número válido de personas (entre 1 y 20).',
          quickReplies: ['2 personas', '4 personas', '6 personas', 'Cancelar']
        };
      }
    }

    if (currentContext === 'reserva-contacto') {
      const { personas, fecha, hora } = contextData;
      conversationManager.clearContext();
      
      const whatsappMessage = `🌿 Nueva Reserva GreenBite Café\n\n👤 ${message}\n👥 Personas: ${personas}\n📅 Fecha: ${fecha}\n🕐 Hora: ${hora}`;
      
      setTimeout(() => {
        window.open(`https://wa.me/573242090985?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
      }, 1000);

      return {
        text: `✅ ¡Reserva confirmada!\n\n📋 Resumen:\n${message}\n👥 ${personas} ${personas === 1 ? 'persona' : 'personas'}\n📅 ${fecha}\n🕐 ${hora}\n\nTe enviaremos una confirmación por WhatsApp al número proporcionado. 📱\n\n¿Hay algo más en lo que pueda ayudarte?`,
        quickReplies: ['Ver el menú', 'Hacer otra reserva', 'Ubicación']
      };
    }

    // Detección de intents sin contexto
    if (lowerMessage.includes('reserva') || lowerMessage.includes('reservar') || lowerMessage.includes('mesa')) {
      conversationManager.setContext('reserva-personas');
      return {
        text: '📅 ¡Perfecto! Voy a ayudarte con tu reserva.\n\n¿Para cuántas personas sería?\n\nPor favor indícame el número de personas (máximo 20).',
        quickReplies: ['2 personas', '4 personas', '6 personas', '8 personas']
      };
    }

    if (lowerMessage.includes('menú') || lowerMessage.includes('menu') || lowerMessage.includes('carta') || lowerMessage.includes('comida')) {
      conversationManager.clearContext();
      setShowCalendar(false);
      setShowTimePicker(false);
      return {
        text: '📋 ¡Nuestro menú es delicioso! Tenemos:\n\n☕ **Bebidas:**\n• Latte Orgánico - $55\n• Smoothie Verde - $48\n• Café Frío Artesanal - $50\n\n🥗 **Comidas:**\n• Ensalada Vital - $60\n• Tarta de Avena - $42\n\nTodos nuestros productos son 100% orgánicos y saludables. 🌿\n\n¿Te gustaría hacer una reserva o saber algo más?',
        quickReplies: ['Hacer reserva', 'Ver más detalles', 'Precios', 'Ubicación']
      };
    }

    if (lowerMessage.includes('hora') || lowerMessage.includes('horario') || lowerMessage.includes('abierto') || lowerMessage.includes('cerrado')) {
      conversationManager.clearContext();
      setShowCalendar(false);
      setShowTimePicker(false);
      return {
        text: '🕐 **Nuestros horarios son:**\n\n📅 Lunes a Viernes\n7:00 AM - 8:00 PM\n\n📅 Sábados\n8:00 AM - 9:00 PM\n\n📅 Domingos\n9:00 AM - 6:00 PM\n\n¿Te gustaría hacer una reserva?',
        quickReplies: ['Hacer reserva', 'Ver menú', 'Ubicación']
      };
    }

    if (lowerMessage.includes('ubicación') || lowerMessage.includes('ubicacion') || lowerMessage.includes('dónde') || lowerMessage.includes('donde') || lowerMessage.includes('dirección') || lowerMessage.includes('direccion') || lowerMessage.includes('llegar')) {
      conversationManager.clearContext();
      setShowCalendar(false);
      setShowTimePicker(false);
      return {
        text: '📍 **Nuestra ubicación:**\n\nCalle 123 #45-67\nBogotá, Colombia\n\nPuedes ver el mapa detallado en nuestra página en la sección "Cómo Llegar" 🗺️\n\n¿Te gustaría hacer una reserva?',
        quickReplies: ['Hacer reserva', 'Ver menú', 'Horarios']
      };
    }

    if (lowerMessage.includes('precio') || lowerMessage.includes('costo') || lowerMessage.includes('cuánto') || lowerMessage.includes('cuanto') || lowerMessage.includes('vale')) {
      conversationManager.clearContext();
      setShowCalendar(false);
      setShowTimePicker(false);
      return {
        text: '💰 **Nuestros precios:**\n\n☕ Bebidas: $48 - $55\n🥗 Comidas: $42 - $60\n\nTodos nuestros productos son:\n✅ 100% orgánicos\n✅ Ingredientes naturales\n✅ Preparación artesanal\n\n¿Te gustaría ver el menú completo?',
        quickReplies: ['Ver menú completo', 'Hacer reserva', 'Ubicación']
      };
    }

    if (lowerMessage.includes('hola') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('buenos') || lowerMessage.includes('buenas')) {
      conversationManager.clearContext();
      setShowCalendar(false);
      setShowTimePicker(false);
      return {
        text: '¡Hola! 😊 Bienvenido a GreenBite Café 🌿\n\n¿En qué puedo ayudarte hoy?',
        quickReplies: ['Hacer una reserva', 'Ver el menú', 'Horarios', 'Ubicación']
      };
    }

    if (lowerMessage.includes('gracias') || lowerMessage.includes('thanks') || lowerMessage.includes('ok') || lowerMessage.includes('vale')) {
      conversationManager.clearContext();
      setShowCalendar(false);
      setShowTimePicker(false);
      return {
        text: '¡De nada! 😊 Fue un placer ayudarte.\n\nSi necesitas algo más, aquí estaré. ¡Que tengas un excelente día! 🌿',
        quickReplies: ['Hacer una reserva', 'Ver el menú']
      };
    }

    if (lowerMessage.includes('cancelar') || lowerMessage.includes('salir') || lowerMessage.includes('atrás') || lowerMessage.includes('atras')) {
      conversationManager.clearContext();
      setShowCalendar(false);
      setShowTimePicker(false);
      return {
        text: 'Entendido, cancelado. ¿En qué más puedo ayudarte?',
        quickReplies: ['Hacer una reserva', 'Ver el menú', 'Horarios', 'Ubicación']
      };
    }

    // Respuesta por defecto
    conversationManager.clearContext();
    setShowCalendar(false);
    setShowTimePicker(false);
    return {
      text: 'Entiendo tu consulta. 😊\n\nPuedo ayudarte con:\n\n📅 Hacer reservaciones\n📋 Información del menú\n🕐 Horarios de atención\n📍 Nuestra ubicación\n💰 Precios\n\n¿Qué te gustaría saber?',
      quickReplies: ['Hacer reserva', 'Ver menú', 'Horarios', 'Ubicación']
    };
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

    const userMessage = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    setTimeout(async () => {
      const response = await processMessage(inputMessage);
      
      const botMessage = {
        text: response.text,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        quickReplies: response.quickReplies || []
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleQuickReply = (replyText) => {
    const userMessage = {
      text: replyText,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(async () => {
      const response = await processMessage(replyText);
      
      const botMessage = {
        text: response.text,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        quickReplies: response.quickReplies || []
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <div className={`telegram-chatbot ${isOpen ? 'open' : ''}`}>
        {isOpen && (
          <div className="chat-window">
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="chat-avatar">
                  <span>🌿</span>
                </div>
                <div className="chat-header-text">
                  <h3>GreenBite Café</h3>
                  <span className="status">En línea</span>
                </div>
              </div>
              <button className="chat-close-btn" onClick={toggleChat}>
                ✕
              </button>
            </div>

            <div className="chat-messages">
              {messages.map((message, index) => (
                <div key={index}>
                  <div
                    className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                  >
                    {message.sender === 'bot' && (
                      <div className="message-avatar">🌿</div>
                    )}
                    <div className="message-content">
                      <p>{message.text}</p>
                      <span className="message-time">
                        {new Date(message.timestamp).toLocaleTimeString('es-ES', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                  {message.quickReplies && message.quickReplies.length > 0 && (
                    <div className="message-quick-replies">
                      {message.quickReplies.map((reply, idx) => (
                        <button
                          key={idx}
                          className="message-quick-reply-btn"
                          onClick={() => handleQuickReply(reply)}
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="message bot-message">
                  <div className="message-avatar">🌿</div>
                  <div className="message-content typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}

              {showCalendar && (
                <div className="picker-container">
                  <CalendarPicker onSelectDate={handleDateSelect} />
                </div>
              )}

              {showTimePicker && (
                <div className="picker-container">
                  <TimePicker 
                    onSelectTime={handleTimeSelect} 
                    selectedDate={conversationManager.getContextData().fechaObject}
                  />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-form" onSubmit={handleSendMessage}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="chat-input"
                disabled={isLoading || showCalendar || showTimePicker}
              />
              <button
                type="submit"
                className="chat-send-btn"
                disabled={!inputMessage.trim() || isLoading || showCalendar || showTimePicker}
              >
                📤
              </button>
            </form>
          </div>
        )}

        <button
          className={`chat-toggle-btn ${isOpen ? 'hidden' : ''}`}
          onClick={toggleChat}
        >
          <span className="chat-icon">💬</span>
          <span className="chat-badge">AI</span>
        </button>
      </div>
    </>
  );
}

export default TelegramChatBot;
