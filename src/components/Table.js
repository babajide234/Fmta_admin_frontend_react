import { element } from "prop-types";
import React,{ useEffect, useState, useMemo  } from "react";
import DataTable from 'react-data-table-component';
import { CDropdown,CDropdownToggle,CDropdownMenu,CDropdownItem } from '@coreui/react'
import { Link } from 'react-router-dom';

export default function Table({col, dataa}) {
    // Table component logic and UI come here
    const [ selectedcolumns, setcolumns ] = useState();
    const [ columndata, setcolumndata ] = useState();

    useEffect(()=>{
        // dataa.map((item)=>{
        //     console.log(item);
        //     const keys = Object.keys(item);
        //     keys.forEach(element=>{

        //         console.log(element)
        //     })
            
        // })
    },[])
    const btn = ()=>{
        return (
            <CDropdown>
                <CDropdownToggle href="#" color="secondary">
                    More
                </CDropdownToggle>
                <CDropdownMenu>
                    <CDropdownItem href="#">Edit</CDropdownItem>
                    <CDropdownItem href="#">Delete</CDropdownItem>
                    <CDropdownItem href="#">Something else here</CDropdownItem>
                </CDropdownMenu>
            </CDropdown>
        )
    }
    const link = (item)=>{
        return (
            <Link to={`/blog/${item.id}`}>{item.title}</Link>
        )
    }
    const columns = useMemo(() => [
        {
            name: 'Title',
            selector:link
        },
        {
            name: 'Author',
            selector: row => row.author,
        },
        {
            name: 'Date Created',
            selector: row => row.dateCreated,
            sortable: true,
        },
        {
            name: 'Published',
            selector: row => row.published,
        },
        {
            name: 'Tags',
            selector: row => row.tags,
        },
        {
            name: 'No Of Views',
            selector: row => row.views,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => row.year,
        },
        {
    	
    	    cell: btn,
        	ignoreRowClick: true,
        	allowOverflow: true,
        	button: true,
        }
    ]);

  
      return (
        <DataTable 
            columns={columns}
            data={dataa}
            selectableRows
            highlightOnHover
            pagination
            responsive
        />
      );
}