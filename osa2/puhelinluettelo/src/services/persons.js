import axios from 'axios'
const baseUrl = '/api/persons'

const create = newPerson => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => {
    return response.data  
  })
}

const remove = id => {
  return axios.delete(baseUrl + `/${id}`)
}

const update = (updatedPerson) => {
  const request = axios.put(`${baseUrl}/${updatedPerson.id}`, updatedPerson)
  return request.then(response => {
    return response.data
  })
}

export default { create, remove, update }