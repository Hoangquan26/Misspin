import React from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Form } from 'react-router-dom';
const SearchBar = () => {
    return (
        <Form className=' text-white p-4 pl-4 pr-4 rounded-3xl flex items-center gap-2'
            style={{
                backgroundColor: '#16171b'
            }}
            >
                <SearchRoundedIcon></SearchRoundedIcon>
                <input placeholder='Search' className=' bg-transparent outline-0' type="text" name='q'/>
        </Form>
    );
};

export default SearchBar;