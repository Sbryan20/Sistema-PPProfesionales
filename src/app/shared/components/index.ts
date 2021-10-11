
import { CardUserComponent } from "./cards/card-user/card-user.component";
import { TitleH1Component } from "./titles/title-h1/title-h1.component";
import { SearchEntityComponent } from './searchs/search-entity/search-entity.component';
import { PipeEntityPipe } from '../../pipes/pipe-entity.pipe';
import { FormCreateUserComponent } from './forms/form-create-user/form-create-user.component';

//import components
export const components: any[]=[
    TitleH1Component,
    CardUserComponent,
    SearchEntityComponent,
    PipeEntityPipe,
    FormCreateUserComponent,


];
export * from './cards/card-user/card-user.component'
export * from './titles/title-h1/title-h1.component'
export * from './searchs/search-entity/search-entity.component'
export * from './forms/form-create-user/form-create-user.component';
