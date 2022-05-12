import firebase from 'firebase/app';
import { createClient } from '@supabase/supabase-js';
import 'firebase/auth';
import 'firebase/database';

export let supabase = createClient(
  'https://fyrwgprifrjdahlqgjip.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5cndncHJpZnJqZGFobHFnamlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTIzMjY4MjcsImV4cCI6MTk2NzkwMjgyN30.hBntBIdNuDnKkJCh_W3dDdL8kCXHAONrPIGEmwe29NM'
);

export default function initializeFirebaseApp() {
  const firebaseConfig = {
    apiKey: 'AIzaSyDaxtmylED-R-252XLmtDkDFhApZzWTp4U',
    authDomain: 'art-of-bloom.firebaseapp.com',
    databaseURL: 'https://art-of-bloom-default-rtdb.firebaseio.com',
    projectId: 'art-of-bloom',
    storageBucket: 'art-of-bloom.appspot.com',
    messagingSenderId: '516107650324',
    appId: '1:516107650324:web:6438a949cabc6cf28b2e01',
    measurementId: 'G-RHCLNGV29Y',
  };

  return () => {
    firebase.initializeApp(firebaseConfig);
  };
}
