import { Component, OnInit } from '@angular/core';
import { PTableColumn, PTableData, PTableRow, PTablePage } from '@pixelmon/pikachu/table';
import { SystemService } from './system.service';
import { AddOreditSystemComponent } from './add-oredit-system/add-oredit-system.component';
import { NzModalService, NzModalRef, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.less']
})
export class SystemComponent implements OnInit {

  tableData: PTableData = {
    data: [],
    totalSize: 0,
  };
  queryParams = {};

  tableLoading = false;
  selections: PTableRow[] = [];
  columns: PTableColumn[] = [
    {
      title: '系统名称',
      field: 'systemName',
    },
    {
      title: '系统编号',
      field: 'systemCode',
    },
    {
      title: '系统类型',
      field: 'systemType',
    },
    {
      title: '创建日期',
      field: 'createTime',
    },
    {
      title: '更新时间',
      field: 'updateTime',
    },
    {
      title: '手机号',
      field: 'phone',
    },
    {
      title: '创建人',
      field: 'creator',
    }
  ];

  constructor(
    private service: SystemService,
    private modal: NzModalService,
    private msg: NzMessageService,
  ) { }

  ngOnInit() { }

  load(page: PTablePage = { page: 1, size: 10 }) {
    this.selections = [];
    this.tableLoading = true;

    this.service.getSystemAll({}).subscribe(
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
          nzTitle: '添加系统',
          nzContent: AddOreditSystemComponent,
          ...params,
          nzComponentParams: {
            type,
          }
        })
        break;
      case 'edit':
        //  编辑系统
        modalRef = this.modal.create({
          nzTitle: '编辑系统',
          nzContent: AddOreditSystemComponent,
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
          nzContent: `是否删除${this.selections[0].name}系统？`,
          ...params,
          nzOnOk: () => {
            this.service.deleteSystem({ ids: this.selections.map(item => item._id) }).subscribe(
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
          this.msg.success(`${type === 'add' ? '添加' : '编辑'}成功`)
          this.load();
        }
      }
    )
  }

}
