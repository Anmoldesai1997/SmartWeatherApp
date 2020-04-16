import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import {white, red700} from 'material-ui/styles/colors';
import {typography} from 'material-ui/styles';


class Header extends React.Component {

  render() {
    

    const styles = {
      paper: {
        fontSize: 24,
        backgroundColor: red700,
        height: 50
      },
      header: {
        fontSize: 24,
        fontWeight: typography.fontWeightLight,
        color: white,
        backgroundColor: red700,
        padding: 10,
      }
    };
    

    return (


      <Paper style={styles.paper}>
        <div style={{...styles.header}}>Smart Weather Application    </div>
          
      </Paper>
        
      );
  }
}

Header.propTypes = {
  styles: PropTypes.object,
  handleChangeRequestNavDrawer: PropTypes.func
};

export default Header;
