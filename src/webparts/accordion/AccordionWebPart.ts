import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { Provider, teamsTheme } from '@fluentui/react-northstar'

import * as strings from 'AccordionWebPartStrings';
import Accordion from './components/Accordion';
import { IAccordionProps } from './components/IAccordionProps';
import AccordionWP from './components/Accordion';
import { IGVAListService } from '../Shared/Model/IGVAListService';
import { GVAListDataService } from '../Shared/Services/GVAListDataService';

export interface IAccordionWebPartProps {
  description: string;
}

export default class AccordionWebPart extends BaseClientSideWebPart<IAccordionWebPartProps> {

  public render(): void {
    var listProvider: IGVAListService;
    listProvider = this.context.serviceScope.consume(GVAListDataService.serviceKey);
   
    const element: React.ReactElement<IAccordionProps> = React.createElement(
      AccordionWP,
      {
        description: this.properties.description,
        listName:'NewDocLib',
        listService: listProvider,
        webUrl:this.context.pageContext.web.absoluteUrl,

      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
