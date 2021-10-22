import AsyncStorage from '@react-native-community/async-storage'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

const NOTIFICATION_KEY= "Flashcards:studyReminder";

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
  }

function createNotification(){
    return {
        title: 'Log your stats',
        body: " 📖 Don't forget to study today",
        ios:{
            sound: true
        },
        android: {
           sound: true,
           priority: 'high',
           sticky: false,
           vibrate: true
        }
    }
}

export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)//ba4of ana tel3 3nde notification abl keda wla l2 lw l2 hytl3ha tmrw w kol youm esa3a 8
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
              if (status === 'granted') {//lw 3ml notif. abl keda hyms7ha
                Notifications.cancelAllScheduledNotificationsAsync()
                //bey set notif. gededa bokra esa3a 8
                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(20)
                tomorrow.setMinutes(0)
  
                Notifications.scheduleNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',
                  }
                )
  
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
      })
  }