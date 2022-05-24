import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import React, { useState } from 'react'
import { LinksCollection } from '../api/links'

export const App = () => {
  const [speed, setSpeed] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const links = useTracker(() => {
    return LinksCollection.find().fetch()
  })

  const handleClick = () => {
    setError('')
    setLoading(true)
    Meteor.call('speedTest.run', {}, (err, res) => {
      if (err) {
        setError(err)
        return
      }
      setSpeed(res)
      setLoading(false)
    })
  }
  return (
    <div>
      <h1>Speed test</h1>
      <button onClick={handleClick}>Test speed</button>
      {loading && <p>Loading...</p>}
      {speed && (
        <pre>
          <code>{JSON.stringify(speed, null, 4)}</code>
        </pre>
      )}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <br />
      <br />
      <br />
      <br />
      <br />
      <h4>This is a list from MongoDB</h4>
      <ul>
        {links.map((link) => (
          <li key={link._id}>
            <a href={link.url} target="_blank">
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
