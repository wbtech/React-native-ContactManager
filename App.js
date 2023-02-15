import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from "react-native";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const addContact = () => {
    if (name && phone) {
      setContacts([...contacts, { name, phone }]);
      setName("");
      setPhone("");
    }
  };

  const updateContact = (index, newName, newPhone) => {
    const newContacts = [...contacts];
    newContacts[index] = { name: newName, phone: newPhone };
    setContacts(newContacts);
  };

  const deleteContact = (index) => {
    const newContacts = [...contacts];
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };

  const searchContacts = () => {
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setContacts(filteredContacts);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder='Name'
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder='Phone'
          value={phone}
          onChangeText={setPhone}
        />
        <Button title='Add Contact' onPress={addContact} />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder='Search Contacts'
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title='Search' onPress={searchContacts} />
      </View>
      <FlatList
        data={contacts}
        renderItem={({ item, index }) => (
          <View style={styles.contact}>
            <Text style={styles.contactName}>{item.name}</Text>
            <Text style={styles.contactPhone}>{item.phone}</Text>
            <View style={styles.contactButtons}>
              <Button
                title='Edit'
                onPress={() => updateContact(index, "New Name", "New Phone")}
              />
              <Button title='Delete' onPress={() => deleteContact(index)} />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  formContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    width: "70%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  contact: {
    marginBottom: 10,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  contactPhone: {
    fontSize: 16,
    color: "gray",
  },
  contactButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
});
