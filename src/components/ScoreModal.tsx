import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ScoreModalProps {
  visible: boolean;
  player: any;
  onClose: () => void;
  onScoreChange: (amount: number) => void;
  onChinchon: () => void;
}

const ScoreModal: React.FC<ScoreModalProps> = ({ visible, player, onClose, onScoreChange, onChinchon }) => {
  const [currentScore, setCurrentScore] = useState(0);

  const handlePress = (amount: number) => {
    setCurrentScore(currentScore + amount);
    onScoreChange(amount);
  };

  const handleChinchon = () => {
    onChinchon();
    onClose();
  }

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.playerName}>{player?.name}</Text>
          <Text style={styles.currentScore}>{currentScore}</Text>
          <View style={styles.buttonGrid}>
            <TouchableOpacity style={styles.scoreButton} onPress={() => handlePress(1)}><Text style={styles.buttonText}>+1</Text></TouchableOpacity>
            <TouchableOpacity style={styles.scoreButton} onPress={() => handlePress(5)}><Text style={styles.buttonText}>+5</Text></TouchableOpacity>
            <TouchableOpacity style={styles.scoreButton} onPress={() => handlePress(10)}><Text style={styles.buttonText}>+10</Text></TouchableOpacity>
            <TouchableOpacity style={styles.scoreButton} onPress={() => handlePress(-1)}><Text style={styles.buttonText}>-1</Text></TouchableOpacity>
            <TouchableOpacity style={styles.scoreButton} onPress={() => handlePress(-5)}><Text style={styles.buttonText}>-5</Text></TouchableOpacity>
            <TouchableOpacity style={styles.scoreButton} onPress={() => handlePress(-10)}><Text style={styles.buttonText}>-10</Text></TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.chinchonButton} onPress={handleChinchon}>
            <Text style={styles.chinchonButtonText}>¡Chinchón!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close-circle" size={40} color="#dc3545" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  playerName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  currentScore: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  scoreButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  chinchonButton: {
    backgroundColor: '#28a745',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 20,
  },
  chinchonButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default ScoreModal;