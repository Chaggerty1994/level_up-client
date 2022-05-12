export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const createEvent = (event) => {
    const fetchOption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(event)
    }

    return fetch("http://localhost:8000/events", fetchOption)
        .then(response => response.json())
}

export const getEventById = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(res => res.json())
}

export const changeEvent = (event) => {
    return fetch(`http://localhost:8000/events/${event.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
            
        },
        body: JSON.stringify(event)
    })
}

export const deleteEvent = (event) => {
    return fetch(`http://localhost:8000/events/${event.id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(getEvents)
}

export const leaveEvent = (eventId) => {
    // TODO: Write the DELETE fetch request to leave an event
    return fetch(`http://localhost:8000/events/${eventId}/leave`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    }).then(getEvents)
  }
  
  export const joinEvent = (eventId) => {
      // TODO: Write the POST fetch request to join and event
      return fetch(`http://localhost:8000/events/${eventId}/signup`, {
          method: "POST",
          headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
          }
      }).then(res => res.json()).then(getEvents)
    }