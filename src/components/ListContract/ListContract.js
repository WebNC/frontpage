import React from 'react'
import NotificationContract from '../NotificationContract/NotificationContract'
import { Pagination, Icon, Spin} from 'antd'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class ContractList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allContracts: [],
            presentContracts: [],
            amount: 0, 
            pageSize : 10,
            isTeacher: null
        }
    }

    componentDidMount() {
      const {contracts, isTeacher} = this.props;
      let presentContracts = [];
      if(contracts.length <= 10) {
        presentContracts = contracts.slice();
      } 
      else {
        for (let i = 0; i < 10; i++) {
          presentContracts.push(contracts[i]);
        }
      }
        this.setState({
          allContracts: contracts,
          amount: contracts.length,
          presentContracts: presentContracts,
          isTeacher: isTeacher
        })
    }

    // UNSAFE_componentWillReceiveProps = (props) =>{
    //   const {contracts, isTeacher} = props;
    //   console.log(contracts.length);
    //   let presentContracts = [];
    //   if(contracts.length <= 10) {
    //     presentContracts = contracts.slice();
    //   } 
    //   else {
    //     for (let i = 0; i < 10; i++) {
    //       presentContracts.push(contracts[i]);
    //     }
    //   }
    //     this.setState({
    //       allContracts: contracts,
    //       amount: contracts.length,
    //       presentContracts: presentContracts,
    //       isTeacher: isTeacher
    //     })
    // }

    handleChange = (value) => {
      const { allContracts, amount, pageSize} = this.state;
      let presentContracts = [];
      let i = (value - 1)*pageSize;

      while (i < value*pageSize && i<amount) {
        presentContracts.push(allContracts[i]);
        i = i + 1;
      }
      
      this.setState({
        presentContracts: presentContracts
      });
  }

    render() {
        const {presentContracts, amount, pageSize, isTeacher} = this.state;
        const listContracts = presentContracts.map((element, index) => {
          return( 
            <NotificationContract isTeacher={isTeacher} contractInfo={element} key={index}/>
          )
        });
        return (
          <>
          {isTeacher === null ? (
            <div style={{textAlign: "center"}}>
              <Spin indicator={antIcon} />
            </div>
          ):(
            <div>
            {listContracts}
            {amount > pageSize && 
              <div className="mb-5 mr-4">
                <Pagination defaultCurrent={1} total= {amount} pageSize = {pageSize} onChange={this.handleChange}/>
              </div>      
            }
          </div>
          )}
        </>   
        )
    }
}
  
export default (ContractList)