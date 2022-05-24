import { Meteor } from 'meteor/meteor'
import speedTest from 'speedtest-net'

Meteor.methods({
  'speedTest.run': function () {
    return speedTest({
      acceptGdpr: true,
      acceptLicense: true,
    })
      .then((res) => {
        console.log(res)
        return res
      })
      .catch((err) => {
        console.error(err)
        return err.message
      })
  },
})
