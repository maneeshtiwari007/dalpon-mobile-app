import { Dimensions, StyleSheet } from "react-native";
import Colors from "../Colors";

export const ThemeStyling = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  container: {
    padding: 15,
    justifyContent: 'center',
    alignItem: 'center',
    minHeight: '100%',
  },
  textPrimary: {
    color: Colors.primary_color
  },
  textOrange: {
    color: Colors.orange_color
  },
  textSuccess: {
    color: Colors.success_color
  },
  bgPrimary: {
    backgroundColor: Colors.primary_color
  },
  bgGray: {
    backgroundColor: Colors.gray200
  },
  imagecontainer: {
    height: 80,
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: 250,
    resizeMode: 'contain',
  },
  heading1: {
    fontSize: Colors.FontSize.h1,
    fontFamily: 'Poppins_700Bold',
    fontWeight: '700',
    color: Colors.darkBlue,
    textTransform: "capitalize",
    marginBottom: 15,
  },
  heading2: {
    fontSize: Colors.FontSize.h2,
    fontFamily: 'Poppins_700Bold',
    fontWeight: '700',
    color: Colors.darkBlue,
    textTransform: "capitalize",
    marginBottom: 15,
  },
  heading3: {
    fontSize: Colors.FontSize.h3,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
    color: Colors.darkBlue,
    marginBottom: 15,
  },
  heading4: {
    fontSize: Colors.FontSize.h4,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
    color: Colors.darkBlue,
    marginBottom: 15,
  },
  heading5: {
    fontSize: Colors.FontSize.h5,
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400',
    textTransform: 'capitalize',
    color: Colors.white,
  },
  text1: {
    fontSize: Colors.FontSize.p,
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400',
    color: Colors.secondry_color,
    marginBottom: 30,
  },
  formgroup: {
    flex: 1,
    position: "relative",
  },
  inputIcon: {
    color: '#000',
    position: "absolute",
    left: 15,
    zIndex: 99,
    top: 15,
  },
  formcontrol: {
    flex: 1,
    borderRadius: 100,
    borderColor: Colors.primary_color,
    color: Colors.gray_color,
    borderStyle: 'solid',
    padding: 10,
    paddingLeft: 60,
    borderWidth: 1,
  },
  inputbtn: {
    position: 'absolute',
    top: 5,
    right: 32,
  },
  textTmc: {
    flex: 1,
    marginBottom: 25
  },
  btnContainer: {
    flex: 1,
    marginBottom: 25,
    textAlign: "center",
    alignItems: 'center'
  },
  btnPrimary: {
    backgroundColor: Colors.primary_color,
    borderRadius: 100,
    padding: 10,
    paddingLeft: 16,
    paddingRight: 16,
    textAlign: "center",
    height: 50,
    minWidth: 200,

  },
  btnText: {
    textAlign: "center",
    fontSize: Colors.FontSize.f20,
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400',
    textTransform: 'capitalize',
    color: Colors.white,
  },
  btnLink: {
    alignItems: 'center',
  },
  btnText2: {
    textAlign: "center",
    fontSize: Colors.FontSize.f18,
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400',
    textTransform: 'capitalize',
    color: Colors.white,
  },
  fixedbottom: {
    paddingTop: 35,
    paddingBottom: 10,
    alignItems: "center",
  },
  arcStyled: {
    backgroundColor: Colors.orange_color,
    paddingBottom: 15,
    borderTopLeftRadius: 500,
    borderTopRightRadius: 500,
  },
  btnprimarydisable: {
    backgroundColor: '#898576',
  },
  //Work Order
  card: {
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardBody: {
    padding: 15,
  },
  twoColumnLayout: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  col10: {
    width: '77%'
  },
  col2: {
    width: '18%',
    alignItems: "center",
    justifyContent: "center"
  },
  text2: {
    fontSize: Colors.FontSize.f12,
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400',
    color: Colors.white,
  },
  notification: {
    position: "relative",
    justifyContent: "flex-end",
    textAlign: "center"
  },
  count: {
    position: "absolute",
    right: 3,
    top: 0,
    width: 8,
    height: 8,
    borderRadius: 50,
    backgroundColor: Colors.orange_color,
    borderColor: Colors.white,
    borderWidth: 1,
  },
  workSchedule: {
    justifyContent: "flex-end"
  },
  date: {
    fontSize: Colors.FontSize.f38,
    lineHeight: 43,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.white,
  },
  monthYear: {
    fontSize: Colors.FontSize.f10,
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400',
    color: Colors.white,
  },
  duration: {
    fontSize: Colors.FontSize.f5,
    fontFamily: 'Poppins_300Light',
    fontWeight: '300',
    color: Colors.white,
  },
  divider: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
  },
  text3: {
    fontSize: Colors.FontSize.f8,
    fontFamily: 'Poppins_300Light',
    fontWeight: '300',
    color: Colors.white,
  },
  icon: {
    fontSize: Colors.FontSize.f8,
    color: Colors.white,
  },
  btnLink2: {
    flexDirection: "row",
    justifyContent: "center",
  },
  btnText_2: {
    fontSize: Colors.FontSize.f8,
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400',
    color: Colors.white,
    marginRight: 10,
  },
  icon2: {
    fontSize: Colors.FontSize.f12,
    color: Colors.white,
  },
  textDark: {
    color: Colors.dark_color
  },
  headingIcon: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 15
  },
  listItem: {
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  listNumber: {
    width: 21,
    height: 21,
    borderRadius: 3,
    backgroundColor: Colors.primary_color,
    alignItems: "center",
    color: Colors.white,
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400',
    fontSize: Colors.FontSize.f11,
    lineHeight: 20,
    marginRight: 10,
    textAlign: "center"
  },
  listText: {
    fontSize: Colors.FontSize.f11,
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400',
    color: Colors.gray300
  },

  // Work Summary
  workSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  counter: {
    flex: 1,
    width: '100%',
    height: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  totalCount: {
    fontSize: Colors.FontSize.f56,
    fontFamily: 'Poppins_700Bold',
    fontWeight: '700',
    lineHeight: 62,
    color: Colors.white,
    textAlign: "center",
  },
  counterTxt: {
    fontSize: Colors.FontSize.f10,
    fontFamily: 'Poppins_500Medium',
    fontWeight: '500',
    color: Colors.white,
    textAlign: "center",
    lineHeight: 13
  },
  hours: {
    fontSize: Colors.FontSize.f30,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.primary_color
  },
  text4: {
    fontSize: Colors.FontSize.f12,
    fontFamily: 'Poppins_500Medium',
    fontWeight: '500',
    color: Colors.dark_color,
    textAlign: "center"
  },

  //Team
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  profileImage: {
    width: 85,
    height: 85,
    borderRadius: 50
  },
  searchBar: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray400,
    paddingBottom: 5,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    height: Dimensions.get('window').height,
    position: 'absolute',
    backgroundColor: "rgba(0,0,0,0.5)",
    width: '100%',
    alignItems: 'center',
    left: 0,
    minWidth: Dimensions.get('window').width,
    zIndex: 9999
  },
  footer: {
    backgroundColor: Colors.orange_color,
    paddingTop: 50,
    paddingBottom: 15,
    borderTopLeftRadius: 5000,
    borderTopRightRadius: 5000,
    marginTop: 'auto',
    marginBottom: 0,
  },
  //Work order
  searchInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray400,
    paddingBottom: 5,
  },
  filterBox: {
    position: 'relative'
  },
  filterResult: {
    backgroundColor: Colors.dark_color,
    position: "absolute",
    left: -6,
    top: '100%',
    width: '100%',
    minHeight: '100%',
    borderRadius: 10,
    padding: 10
  },
  //Work order details
  threeColumnLayout: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  tabMenu: {
    backgroundColor: Colors.gray_color,
    textAlign: "center",
    borderRadius: 30,
    padding: 5,
    paddingHorizontal: 15
  },
  btnCircle: {
    padding: 10,
    width: 90,
    height: 90,
    borderRadius: 100,
    justifyContent: "center",
    backgroundColor: Colors.success_color,
  },
  icon3: {
    position: "relative",
    top: -2
  },
  btnSuccess: {
    backgroundColor: Colors.success_color,
    borderRadius: 100,
    paddingVertical: 6,
    paddingHorizontal: 15,
    textAlign: "center",
  },
  btnInfo: {
    backgroundColor: Colors.light_crystal_blue_disable,
    borderRadius: 100,
    paddingVertical: 6,
    paddingHorizontal: 15,
    textAlign: "center",
  },
  formgroup2: {
    flex: 1,
    marginBottom: 20
  },
  btnDark: {
    backgroundColor: Colors.dark_color,
    borderRadius: 100,
    padding: 10,
    paddingLeft: 16,
    paddingRight: 16,
  },
  btnLightDanger: {
    backgroundColor: Colors.dangerLight,
    borderRadius: 100,
    padding: 10,
    paddingLeft: 16,
    paddingRight: 16,
  },
  gallery: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap"
  },
  galleryItem: {
    width:'40%',
    marginTop:20,
    paddingHorizontal:20
  },
});
