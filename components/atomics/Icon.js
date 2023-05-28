import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const iconTypeMap = {
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
  Ionicons,
};

function getIcon(type) {
  return iconTypeMap[type] || MaterialIcons;
}

export { getIcon };
