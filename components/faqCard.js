import { StyleSheet, View, Text } from 'react-native';

const FaqCard = ({ item: { question, answer } }) => {

  return (
    <View style={styles.faqContainer}>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.answerContainer}>
        <Text style={styles.answerText}>{answer}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  faqContainer: {
    flex: 1,
    padding: 20,
    borderRadius: 5,
    marginTop: "4%",
    backgroundColor: '#FFFFFF',
  },
  question: {
    fontSize: 14,
    fontFamily: 'balsamiq-bold',
    marginBottom: 10,
  },
  answerContainer: {
    flexDirection: 'row',
  },
  answer: {
    flex: 1,
  },
  answerText: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'balsamiq-regular',
  }
});

export default FaqCard
