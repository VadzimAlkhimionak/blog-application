import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export const SelectForm = ({handleChange, value, label, items, disabled}) => {
    return (
        <FormControl variant="outlined" fullWidth={true}>
            <InputLabel id={label}>{label}</InputLabel>
            <Select
                labelId={label}
                id={label}
                value={value}
                defaultValue=""
                onChange={handleChange}
                disabled={disabled}
            >
                { items.map(item => <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>) }
            </Select>
        </FormControl>
    );
}

SelectForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    label: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    disabled: PropTypes.bool.isRequired,
}