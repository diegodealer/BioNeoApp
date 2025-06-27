import { StyleSheet } from "react-native";

const cardstiles = StyleSheet.create({
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2ee59d',
    marginHorizontal: 10,
    borderRadius: 12,
    marginBottom: 10,
    padding: 8,
    marginTop: 10,
  },
  avatar: { 
    width: 40, 
    height: 40,
    borderRadius: 20, 
    marginRight: 10 
  },
  headerText: { 
    fontWeight: 'bold', 
    fontSize: 18, 
    color: '#222', 
    flex: 1 
  },
  leaf: { 
    width: 32,
    height: 32 
  },
  header: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    alignSelf: 'center', 
    marginVertical: 8, 
    letterSpacing: 2 
  },
  card: {
    backgroundColor: '#6d3b2c',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 12,
    borderWidth: 3,
    borderColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: { 
    width: 80, 
    height: 80, 
    borderRadius: 12, 
    marginRight: 12, 
    backgroundColor: '#fff' 
  },
  cardContent: { 
    flex: 1 
  },
  cardTitle: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 18, 
    marginBottom: 2 
  },
  cardSubtitle: { 
    color: '#fff', 
    fontSize: 12, 
    marginBottom: 4
  },
  infoRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  cardInfo: { 
    color: '#fff', 
    fontSize: 12, 
    marginRight: 10 
  },
  verMasBtn: { 
    marginTop: 8, 
    alignSelf: 'flex-start', 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    paddingHorizontal: 10, 
    paddingVertical: 4 
  },
  verMasText: { 
    color: '#6d3b2c', 
    fontWeight: 'bold', 
    fontSize: 14 
  },
  fab: {
    position: 'absolute', 
    bottom: 60, 
    left: '50%', 
    marginLeft: -28,
    backgroundColor: '#fff', 
    width: 56, 
    height: 56, 
    borderRadius: 28,
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 2, 
    borderColor: '#6d3b2c', 
    elevation: 4,
  },
  fabText: { 
    fontSize: 36, 
    color: '#6d3b2c', 
    fontWeight: 'bold' 
  },
  bottomBar: {
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0,
    flexDirection: 'row', 
    backgroundColor: '#6d3b2c', 
    height: 56, 
    justifyContent: 'space-around', 
    alignItems: 'center'
  },
  bottomBtn: { 
    flex: 1, 
    alignItems: 'center' 
  },
  bottomIcon: { 
    fontSize: 28,
    color: '#fff'
  },
});

export default cardstiles;