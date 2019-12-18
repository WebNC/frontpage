import {connect} from 'react-redux'
import IncomeChart from '../../components/IncomeChart/IncomeChart'

const mapStateToProps = (state) => {
    return {
      id: state.user.user._id,
    };
  }
export default connect(mapStateToProps)(IncomeChart);