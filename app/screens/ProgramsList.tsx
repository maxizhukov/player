import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import axios from 'axios';

interface IProps {
  navigation: any;
}

const ProgramsList = (props: IProps) => {
  const [showLoader, setShowLoader] = useState(true);

  const [programsData, setProgramsData] = useState<any>([]);

  // Fetch all programs
  const getAllPrograms = async () => {
    await axios
      .get('https://api.iawaketechnologies.com/api/v2/media-library/free', {
        params: {resetCache: false},
      })
      .then((res: any) => {
        if (res && res.data?.programs) {
          setProgramsData(res.data.programs);
        }
      })
      .catch((err: any) => {
        console.log('Error');
        console.log(err);
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

  useEffect(() => {
    getAllPrograms();
  }, []);

  return (
    <View>
      {showLoader ? (
        <ActivityIndicator />
      ) : (
        <>
          {programsData && programsData.length ? (
            <ScrollView style={styles.container}>
              {programsData.map((program: any) => (
                <TouchableOpacity
                  key={program.id}
                  style={styles.item_container}
                  onPress={() =>
                    props.navigation.navigate('Tracks', {
                      tracks: program.tracks,
                      banner: program.cover.url,
                      title: program.title,
                    })
                  }>
                  <ImageBackground
                    source={{uri: program.cover.url}}
                    resizeMode="cover"
                    imageStyle={{borderRadius: 10}}
                    style={styles.item_image}>
                    <View style={{alignSelf: 'flex-start'}}>
                      <Text style={styles.item_title}>{program.title}</Text>
                    </View>
                    <View style={styles.item_info_container}>
                      <View
                        style={[
                          styles.item_info_card,
                          {
                            backgroundColor: program.isFree ? 'green' : 'red',
                          },
                        ]}>
                        <Text style={{color: '#ffffff'}}>
                          {program.isFree ? 'Free' : 'Subscription'}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.item_info_card,
                          {
                            backgroundColor: program.isFree ? 'yellow' : 'blue',
                          },
                        ]}>
                        <Text
                          style={
                            program.isAvailable
                              ? {color: '#000000'}
                              : {color: '#ffffff'}
                          }>
                          {program.isAvailable ? 'Available' : 'Coming Soon'}
                        </Text>
                      </View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <Text>No Data found</Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  item_container: {
    width: '100%',
    height: 100,
    marginBottom: 10,
  },
  item_image: {
    width: '100%',
    height: '100%',
    padding: 10,
    position: 'relative',
  },
  item_title: {
    fontSize: 12,
    backgroundColor: 'rgba(255,255,255, 0.9)',
    paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 5,
  },
  item_info_container: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    flexDirection: 'row',
  },
  item_info_card: {
    paddingLeft: 3,
    paddingTop: 1,
    paddingBottom: 1,
    paddingRight: 3,
    backgroundColor: '#000000',
    borderRadius: 5,
    marginRight: 5,
  },
});

export default ProgramsList;
