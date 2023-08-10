// import React from 'react';
// import {
//   TouchableWithoutFeedback,
//   Keyboard,
//   StyleProp,
//   ViewStyle,
//   View
// } from 'react-native';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

// const DismissKeyboardView: React.FC<{style?: StyleProp<ViewStyle>}>= ({children, ...props}) => (
//   <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
//     <KeyboardAwareScrollView {...props} style={props.style}>
//       <View style={{ flex: 1, backgroundColor: 'black' }}>
//       {children}
//       </View>
//     </KeyboardAwareScrollView>
//   </TouchableWithoutFeedback>
// );

// export default DismissKeyboardView;
import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleProp,
  ViewStyle,
  View,
  ScrollView,
  ScrollViewProps,
  ViewProps
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

interface DismissKeyboardViewProps extends ScrollViewProps, ViewProps {
  style?: StyleProp<ViewStyle>;
}

const DismissKeyboardView: React.FC<DismissKeyboardViewProps>= ({children, ...props}) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAwareScrollView {...props} style={props.style}>
      <View>
      {children}
      </View>
    </KeyboardAwareScrollView>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;