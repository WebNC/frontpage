import React from 'react';
import {Input, Select } from 'antd';

const { Option } = Select;
const data = ['Quận 1', 'Quận 2', 'Quận 3','Quận 4', 'Quận 5', 
            'Quận 6', 'Quận 7','Quận 8','Quận 9', 'Quận 10', 
            'Quận 11', 'Quận 12',  'Quận Bình Thạnh', 'Quận Gò Vấp', 'Quận Tân Bình', 'Quận Thủ Đức',
            'Quận Tân Phú', 'Quận Bình Tân', 'Quận Phú Nhuận', 'Huyện Củ Chi', 'Huyện Hóc Môn', 
            'Huyện Bình Chánh', 'Huyện Nhà Bè', 'Huyện Cần Giờ'
          ];  
const listDistrict= [];

data.forEach((item) => {
  listDistrict.push(<Option key={item}>{item}</Option>)
});

class AddressInput extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      address: value.address || '',
      district: value.district || 'Quận 1',
    };
  }

  handleAddressChange = e => {
    if (!('value' in this.props)) {
      this.setState({ address: e.target.value  });
    }
    this.triggerChange({ address: e.target.value  });
  };

  handleDistrictChange = district => {
    if (!('value' in this.props)) {
      this.setState({ district });
    }
    this.triggerChange({ district });
  };

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange({
        ...this.state,
        ...changedValue,
      });
    }
  };

  render() {
    const { size } = this.props;
    const { district, address } = this.state;
    return (
      <div>
        <span>
        <Input
          type="text"
          size={size}
          value={address}
          onChange={this.handleAddressChange}
          style={{ width: '65%', marginRight: '3%' }}
        />
        <Select
          value={district}
          size={size}
          style={{ width: '32%' }}
          onChange={this.handleDistrictChange}
        >
          {listDistrict}
        </Select>
      </span>
      </div>
      
    );
  }
}

export default AddressInput