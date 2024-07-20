// FeedbackScreen.js

import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { firebase } from '../firebase/firebaseConfig'; // Ensure firebase is imported correctly

export default function FeedbackScreen() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [averageRating, setAverageRating] = useState(0);
  const [ratingsCount, setRatingsCount] = useState(0);
  const [feedbackOptions, setFeedbackOptions] = useState([
    "Driver was friendly",
    "Car was clean",
    "Good driving",
    "On-time",
    "Poor navigation",
    "Car issues"
  ]);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const database = firebase.database();
      const snapshot = await database.ref('ratings').once('value');
      const ratingsData = snapshot.val() || {};
      const ratingList = Object.values(ratingsData);
      
      if (ratingList.length > 0) {
        const totalRating = ratingList.reduce((acc, item) => acc + item.rating, 0);
        const count = ratingList.length;
        setAverageRating(totalRating / count);
        setRatingsCount(count);
      } else {
        setAverageRating(0);
        setRatingsCount(0);
      }
    } catch (error) {
      console.error("Error fetching ratings: ", error);
    }
  };

  const submitRating = async () => {
    if (rating === 0) {
      Alert.alert('Please provide a rating');
      return;
    }

    try {
      const database = firebase.database();
      const newRatingRef = database.ref('ratings').push();
      const timestamp = Date.now();

      await newRatingRef.set({
        rating,
        comment: comment || "", // Ensure comment is never undefined or null
        timestamp,
      });

      Alert.alert('Thank you!', 'Your rating has been submitted.');
      // Clear the comment and rating after submission
      setComment('');
      setRating(0);
      fetchRatings(); // Refresh ratings data
    } catch (error) {
      console.error("Error submitting rating: ", error);
    }
  };

  const handleTagPress = (tag) => {
    // Check if the comment already includes the tag
    if (!comment.includes(tag)) {
      setComment(prevComment => {
        // Append the tag to the existing comment
        if (prevComment) {
          return `${prevComment}, ${tag}`;
        } else {
          return tag;
        }
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Rate Your Experience</Text>

      <View style={styles.ratingContainer}>
        <AirbnbRating
          size={40}
          defaultRating={0}
          onFinishRating={value => setRating(value)}
          starContainerStyle={styles.starContainer}
        />
      </View>

      <View style={styles.feedbackContainer}>
        <Text style={styles.feedbackTitle}>What did you like?</Text>
        <FlatList
          data={feedbackOptions}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.tag}
              onPress={() => handleTagPress(item)} // Handle the tag press
            >
              <Text style={styles.tagText}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tagList}
        />
        <TextInput
          style={styles.input}
          placeholder='Additional comments (optional)'
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity style={styles.submitButton} onPress={submitRating}>
          <Text style={styles.submitButtonText}>Submit Rating</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.averageRatingView}>
        <View style={styles.averageRatingCard}>
          <Text style={styles.averageRatingText}>Average Rating</Text>
          <Text style={styles.averageRatingValue}>{averageRating.toFixed(1)}</Text>
        </View>
        <View style={styles.totalRatingCard}>
          <Text style={styles.totalRatingText}>Total Ratings</Text>
          <Text style={styles.totalRatingValue}>{ratingsCount}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    padding: 20,
  },
  title: {
    marginVertical: 20,
    color: '#333',
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  ratingContainer: {
    alignItems: 'center',
    marginVertical: 5,
  },
  starContainer: {
    paddingVertical: 20,
  },
  feedbackContainer: {
    backgroundColor: '#32a4a8', // Primary color for feedback section
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  feedbackTitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tagList: {
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tag: {
    backgroundColor: '#4db6ac', // Lighter color for tags
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  tagText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    fontSize: 18,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#00796B',
  },
  submitButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  submitButtonText: {
    color: '#32a4a8',
    fontSize: 18,
    fontWeight: 'bold',
  },
  averageRatingView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  averageRatingCard: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    minWidth: 150,
  },
  averageRatingText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  averageRatingValue: {
    fontSize: 28,
    color: '#32a4a8',
    fontWeight: 'bold',
  },
  totalRatingCard: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    minWidth: 150,
  },
  totalRatingText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  totalRatingValue: {
    fontSize: 28,
    color: '#32a4a8',
    fontWeight: 'bold',
  },
});

export { FeedbackScreen };

