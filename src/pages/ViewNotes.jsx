import { Box, Text, Select, VStack, Heading } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { client } from '../../lib/crud';

const ViewNotes = () => {
  const [notes, setNotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      const allNotes = await client.getWithPrefix('note:');
      if (allNotes) {
        setNotes(allNotes.map(n => n.value));
      }
    };

    const fetchTags = async () => {
      const allTags = await client.getWithPrefix('tag:');
      if (allTags) {
        setTags(allTags.map(t => t.value));
      }
    };

    fetchNotes();
    fetchTags();
  }, []);

  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
  };

  return (
    <Box p={5}>
      <Heading mb={4}>View Notes</Heading>
      <Select placeholder="Filter by tag" onChange={handleTagChange}>
        {tags.map(tag => (
          <option key={tag} value={tag}>{tag}</option>
        ))}
      </Select>
      <VStack spacing={4} mt={4}>
        {notes.filter(note => note.tags.includes(selectedTag)).map(note => (
          <Box key={note.id} p={5} shadow="md" borderWidth="1px">
            <Text mt={2}>{note.content}</Text>
            <Text fontSize="sm">Tags: {note.tags.join(', ')}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default ViewNotes;