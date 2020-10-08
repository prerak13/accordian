import * as React from 'react';
import styles from './Accordion.module.scss';
import { IAccordionProps } from './IAccordionProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Button, Layout } from '@fluentui/react-northstar';
import { Provider, teamsTheme } from '@fluentui/react-northstar'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import './Accordion.css';
import { IDocLibrary } from '../../Shared/Model/IGVAListsInterfaces';
export interface IAccordianState {
  listItems: IDocLibrary[];
}
export default class AccordionWP extends React.Component<IAccordionProps, IAccordianState> {
  constructor(p:IAccordionProps,s:IAccordianState){
    super(p);
    this.state={
      listItems:[],
    }
  }
  public componentDidMount(): void {
    debugger;
    if(this.props.listName!=null)
    this.props.listService.getAllItems(this.props.listName).then((result: Array<IDocLibrary>) => {
      console.log(result)
      this.setState({listItems:result});

    });
  }
  public render(): React.ReactElement<IAccordionProps> {
    if(this.state.listItems.length>0){
      const Ret: Function =()=>
      <Accordion allowZeroExpanded>
      {this.state.listItems.filter(x=>x.FileSystemObjectType==1).map(x=>
          <AccordionItem>

            <AccordionItemHeading>
                        <AccordionItemButton>
                            {x.FileLeafRef}
                        </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                
                 {
                 this.state.listItems.filter(y=>y.FileRef.indexOf(x.FileRef+'/')!=-1)
                                          .map(z=><><a className={'button js-button'} download href={z.FileRef}>{z.FileLeafRef}</a></>)
                 }
                 
             </AccordionItemPanel>
          </AccordionItem>
        )}
        </Accordion>
      
      return (
        <Provider theme={teamsTheme}>
       <Ret/>

  </Provider>
      );
    }
   
    else 
    return(<p>Document Library is empty</p>)
  }
}
