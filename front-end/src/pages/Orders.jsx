import React from 'react'
import {  Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, ColumnsDirective, ColumnDirective, GridComponent } from '@syncfusion/ej2-react-grids';

import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { Header } from '../components';


const Orders = () => {
  // const [data, setData] = useState([]);

  // const fetchOrdersData = async () => {
  //   // Fetch data from your API or other source
  //   const result = await fetchDataFromApi();
  //   setData(result);
  // };

  // useEffect(() => {
  //   fetchOrdersData();
  // }, []); // Run the effect once on component mount

  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders" />
      {/* <GridComponent
      id="gridcomp"
      dataSource={ordersData}
      allowPaging
      allowSorting
      allowExcelExport
      allowPdfExport
      contextMenuItems={contextMenuItems}
      editSettings={editing}
      >
      <ColumnsDirective>
          {ordersGrid.map((item,index) => (<ColumnDirective key={index} {...item} />))}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent> */}
      </div>
  )
}

export default Orders