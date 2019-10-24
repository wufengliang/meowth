import { Component, OnInit } from '@angular/core';
import { TableColumn, TableData, TableRow, TablePage } from '@pixelmon/pikachu/table';
import { CICDVaribalesService } from './cicd-variables.service';
import { NzModalService, NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { AddOrEditCicdvariablesComponent } from './add-or-edit-cicdvariables/add-or-edit-cicdvariables.component';

@Component({
  selector: 'app-cicd-variables',
  templateUrl: './cicd-variables.component.html',
  styleUrls: ['./cicd-variables.component.less']
})
export class CicdVariablesComponent implements OnInit {

  tableData: TableData = {
    data: [],
    totalSize: 0,
  };
  queryParams = {};

  tableLoading = false;
  selections: TableRow[] = [];
  columns: TableColumn[] = [
    {
      title: '环境',
      field: 'environment',
    },
    {
      title: '端口',
      field: 'port',
    },
    {
      title: 'ip地址',
      field: 'ip',
    },
    {
      title: '服务器部署路径',
      field: 'path',
    }
  ];

  constructor(
    private service: CICDVaribalesService,
    private modal: NzModalService,
    private msg: NzMessageService,
  ) { }

  ngOnInit() { }

  load(page: TablePage = { page: 1, size: 10 }) {
    this.selections = [];
    this.tableLoading = true;

    this.service.getCICDAll({}).subscribe(
      data => {
        this.tableData = data;
        this.tableLoading = false;
      },
      () => {
        this.tableLoading = false;
      }
    )
  }

  onQueryChange(queryParams) {
    this.queryParams = queryParams;
    window.setTimeout(() => this.load());
  }

  operate(type: string): void {
    let params = {
      width: 550,
      nzMaskClosable: false,
      nzFooter: null
    }, modalRef: NzModalRef = null;
    switch (type) {
      case 'add':
        //  添加系统
        modalRef = this.modal.create({
          nzTitle: '添加CICD变量',
          nzContent: AddOrEditCicdvariablesComponent,
          ...params,
          nzComponentParams: {
            type,
          }
        })
        break;
      case 'edit':
        //  编辑系统
        modalRef = this.modal.create({
          nzTitle: '编辑CICD变量',
          nzContent: AddOrEditCicdvariablesComponent,
          ...params,
          nzComponentParams: {
            data: this.selections[0],
            type
          }
        })
        break;
      case 'delete':
        this.modal.confirm({
          nzTitle: '提示',
          nzContent: `是否删除${this.selections[0].environment}环境？`,
          ...params,
          nzOnOk: () => {
            this.service.deleteCICD({ ids: this.selections.map(item => item._id) }).subscribe(
              () => {
                this.msg.success('删除成功');
                this.load();
              }
            )
          }
        })
        break;
      default:
        break;
    }

    if (!modalRef) {
      return;
    }

    modalRef.afterClose.subscribe(
      result => {
        if (result === 'success') {
          this.msg.success(`${type === 'add' ? '添加' : '编辑'}成功`);
          this.load();
        }
      }
    )
  }

}
