import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface AppModalProps {
  visible: boolean;
  title: string;
  message: string;
  buttons: {
    text: string;
    onPress: () => void;
    style?: "default" | "cancel" | "destructive";
  }[];
}

const AppModal: React.FC<AppModalProps> = ({
  visible,
  title,
  message,
  buttons,
}) => {
  const getButtonStyle = (style?: "default" | "cancel" | "destructive") => {
    switch (style) {
      case "destructive":
        return styles.destructiveButton;
      case "cancel":
        return styles.cancelButton;
      default:
        return styles.defaultButton;
    }
  };

  const getButtonTextStyle = (style?: "default" | "cancel" | "destructive") => {
    return style === "cancel" ? styles.cancelButtonText : styles.buttonText;
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalMessage}>{message}</Text>
          <View style={styles.buttonContainer}>
            {buttons.map((btn, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.button, getButtonStyle(btn.style)]}
                onPress={btn.onPress}
              >
                <Text style={getButtonTextStyle(btn.style)}>{btn.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  modalMessage: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  defaultButton: {
    backgroundColor: '#007bff',
  },
  destructiveButton: {
    backgroundColor: '#dc3545',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  cancelButtonText: {
    color: "white",
  },
});

export default AppModal;
