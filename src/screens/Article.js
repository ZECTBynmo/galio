import React from 'react';
import { View, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
// galio components
import { Typography, AuthorSection } from '../';

const Article = props => (
  <View style={{ flex: 1 }}>
    <StatusBar hidden={false} barStyle="light-content" />
    <Image
      style={{ width: '100%', height: '45%' }}
      source={{
        uri:
          'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fc7f17d00c13cf50d62f4ebd5743a9bc&auto=format&fit=crop&w=1950&q=80',
      }}
    />
    <TouchableOpacity style={styles.backButton} onPress={() => props.navigation.openDrawer()}/>
    <View style={styles.articleContainer}>
      <Typography h2>I would happily watch a TV show about crabs</Typography>
      <Typography p muted style={{ marginTop: 5 }}>Interviewing this super star</Typography>
      <AuthorSection 
        imageSource="http://i.pravatar.cc/100"
        title="Alin Gheorghe"
        subTitle="420 minutes ago"
        style={{ marginTop: 15 }}
        optionalComponent={<View />}
      />
      <Typography p bold style={{ marginTop: 10 }}>You should totally like check this out, ok? Why would you use another UI library when you have so many components written by Creative Tim and the whole React Native community. Galio was created by developers for developers.</Typography>
      <Typography p style={{ marginTop: 10 }}>A lot of Bacon. I'd really like to eat like a LOT of Bacon :(.</Typography>
    </View>
  </View>
);

const styles = StyleSheet.create({
  articleContainer: {
    position: 'absolute',
        top: '38%',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgb(250,250,250)',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingTop: 25,
        paddingLeft: 20,
        paddingRight: 20
  },
  backButton: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: '5%',
    left: '5%',
    backgroundColor: '#A833FE'
  }
});

export default Article;