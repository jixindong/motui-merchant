<template>
	<div class="card p-4 min-h-800">
		<!-- 大标题 -->
		<div class="headline">宝贝管理</div>

		<!-- 功能区域 -->
		<div class="d-flex justify-content-between my-4">
			<el-input type="text" size="medium" class="w-20" v-model="search.name" placeholder="请输入宝贝名称" clearable></el-input>
			<el-select size="medium" class="w-20" v-model="search.platform" placeholder="请选择宝贝平台" clearable>
				<el-option label="请选择" value=""></el-option>
				<el-option label="淘宝" value="淘宝"></el-option>
				<el-option label="京东" value="京东"></el-option>
				<el-option label="抖音小店" value="抖音小店"></el-option>
			</el-select>
			<el-select size="medium" class="w-20" v-model="search.classify" placeholder="请选择宝贝分类" clearable>
				<el-option label="请选择" value=""></el-option>
				<el-option v-for="(item, index) in commodityClassify" :key="index" :label="item" :value="item"></el-option>
			</el-select>
			<el-select size="medium" class="w-20" v-model="search.status" placeholder="请选择宝贝状态" clearable>
				<el-option label="请选择" value=""></el-option>
				<el-option label="待审核" value="待审核"></el-option>
				<el-option label="审核通过" value="审核通过"></el-option>
				<el-option label="审核失败" value="审核失败"></el-option>
			</el-select>
			<el-button type="primary" size="medium" icon="el-icon-search" plain @click="searchCommodity">搜索</el-button>
		</div>
		<div class="d-flex justify-content-end mb-4">
			<el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="commodityAddDV = true">增加宝贝</el-button>
			<el-button type="danger" size="medium" icon="el-icon-delete" plain @click="commodityBatchDelete">批量删除</el-button>
		</div>

		<!-- 商品列表 -->
		<div>
			<el-table :data="commodityList" @selection-change="commoditySelect" stripe border>
				<el-table-column type="selection" fixed></el-table-column>
				<el-table-column label="名称">
					<template slot-scope="scope">
						<el-button type="text" @click="viewCommodityDetail(scope.row)">{{ scope.row.name }}</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="pt" label="平台" show-overflow-tooltip></el-table-column>
				<el-table-column prop="type" label="分类" show-overflow-tooltip></el-table-column>
				<el-table-column prop="price" label="价格" show-overflow-tooltip></el-table-column>
				<el-table-column prop="yhq" label="优惠券" show-overflow-tooltip></el-table-column>
				<el-table-column prop="yj" label="佣金比例" show-overflow-tooltip></el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
						<span class="text-primary" v-if="scope.row.status === '0'">待审核</span>
						<span class="text-success" v-else-if="scope.row.status === '1'">审核通过</span>
						<span class="text-danger" v-else>审核失败</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="120" align="center">
					<template slot-scope="scope">
						<el-button type="primary" size="mini" icon="el-icon-edit" plain @click="commodityEdit(scope.row)"></el-button>
						<el-button type="danger" size="mini" icon="el-icon-delete" plain @click="commodityDelete(scope.row)"></el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="d-flex justify-content-center mt-4">
				<el-pagination
					layout="prev, pager, next"
					hide-on-single-page
					:total="commodityListPage.total"
					:page-size="commodityListPage.pageSize"
					:current-page="commodityListPage.currentPage"
					@current-change="commodityListCurrentChange"
				></el-pagination>
			</div>
		</div>

		<!-- 商品详情对话框 -->
		<el-dialog title="宝贝详情" width="1000px" :visible.sync="commodityDetailDV">
			<el-row>
				<el-col :span="8">名称：{{ this.commodityDetail.name }}</el-col>
				<el-col :span="8">平台：{{ this.commodityDetail.pt }}</el-col>
				<el-col :span="8">分类：{{ this.commodityDetail.type }}</el-col>
				<el-col :span="8">价格：{{ this.commodityDetail.price }}</el-col>
				<el-col :span="8">优惠券：{{ this.commodityDetail.yhq }}</el-col>
				<el-col :span="8">佣金比例：{{ this.commodityDetail.yj }}</el-col>
				<el-col :span="24">
					链接：
					<el-link :href="this.commodityDetail.video" target="_blank" type="primary">{{ commodityDetail.video }}</el-link>
				</el-col>
				<el-col :span="12" class="d-flex">
					<span>图片：</span>
					<img :src="this.commodityDetail.path" class="w-75" />
				</el-col>
			</el-row>
		</el-dialog>

		<!-- 添加商品对话框 -->
		<el-dialog title="添加宝贝" width="1000px" :visible.sync="commodityAddDV" :before-close="cADClose">
			<el-form :model="commodityAddForm" :rules="commodityAddRules" ref="commodityAddFormRef" label-width="100px" status-icon>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="名称" prop="name" required>
							<el-input type="text" placeholder="请输入宝贝名称" v-model="commodityAddForm.name" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="平台" prop="pt" required>
							<el-select v-model="commodityAddForm.pt" clearable>
								<el-option label="请选择" value=""></el-option>
								<el-option label="淘宝" value="淘宝"></el-option>
								<el-option label="抖音小店" value="抖音小店"></el-option>
								<el-option label="京东" value="京东"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="分类" prop="typeName" required>
							<el-select v-model="commodityAddForm.typeName" clearable>
								<el-option label="请选择" value=""></el-option>
								<el-option v-for="(v, i) in commodityClassify" :key="i" :label="v" :value="v"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="价格" prop="price" required>
							<el-input type="text" placeholder="请输入宝贝价格" v-model="commodityAddForm.price" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="优惠券" prop="yhq" required>
							<el-input type="text" placeholder="请输入优惠券" v-model="commodityAddForm.yhq" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="佣金比例" prop="yj" required>
							<el-input type="number" placeholder="请输入佣金比例" v-model="commodityAddForm.yj" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="链接" prop="video" required>
							<el-input type="text" placeholder="请输入宝贝链接" v-model="commodityAddForm.video" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="图片">
							<el-upload class="img-uploader" action="http://mtht.waszn.com:8001/upload/uploadFile" :show-file-list="false" :on-success="addCommodityImg">
								<img :src="commodityAddForm.path" v-if="commodityAddForm.path" />
								<i v-else class="el-icon-plus img-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-col>
				</el-row>

				<div class="d-flex justify-content-center">
					<el-button type="primary" size="medium" @click="submitCAF">确认添加</el-button>
					<el-button type="primary" size="medium" plain @click="resetCAF">重置</el-button>
				</div>
			</el-form>
		</el-dialog>

		<!-- 编辑商品对话框 -->
		<el-dialog title="编辑宝贝" width="1000px" :visible.sync="commodityEditDV" :before-close="cEDClose">
			<el-form :model="commodityEditForm" :rules="commodityEditRules" ref="commodityEditFormRef" label-width="100px" status-icon>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="名称" prop="name" required>
							<el-input type="text" placeholder="请输入宝贝名称" v-model="commodityEditForm.name" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="平台" prop="pt" required>
							<el-select v-model="commodityEditForm.pt" clearable>
								<el-option label="请选择" value=""></el-option>
								<el-option label="淘宝" value="淘宝"></el-option>
								<el-option label="抖音小店" value="抖音小店"></el-option>
								<el-option label="京东" value="京东"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="分类" prop="typeName" required>
							<el-select v-model="commodityEditForm.typeName" clearable>
								<el-option label="请选择" value=""></el-option>
								<el-option v-for="(v, i) in commodityClassify" :key="i" :label="v" :value="v"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="价格" prop="price" required>
							<el-input type="text" placeholder="请输入宝贝价格" v-model="commodityEditForm.price" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="优惠券" prop="yhq" required>
							<el-input type="text" placeholder="请输入优惠券" v-model="commodityEditForm.yhq" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="佣金比例" prop="yj" required>
							<el-input type="number" placeholder="请输入佣金比例" v-model="commodityEditForm.yj" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="链接" prop="video" required>
							<el-input type="text" placeholder="请输入宝贝链接" v-model="commodityEditForm.video" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="图片">
							<el-upload class="img-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="editCommodityImg">
								<img :src="commodityEditForm.path" v-if="commodityEditForm.path" />
								<i v-else class="el-icon-plus img-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-col>
				</el-row>

				<div class="d-flex justify-content-center">
					<el-button type="primary" size="medium" @click="submitCEF">确认修改</el-button>
					<el-button type="primary" size="medium" plain @click="resetCEF">重置</el-button>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import * as commodity from '@/api/commodity';

export default {
	name: 'CommodityManage',
	data() {
		return {
			/* ======================== 商品 ======================== */
			// 搜索
			search: {
				name: null,
				platform: null,
				classify: null,
				status: null
			},
			// 列表
			commodityList: [],
			// 分页
			commodityListPage: {
				total: 1,
				pageSize: 1,
				totalPage: 1,
				currentPage: 1
			},
			// 已选择
			commoditySelected: [],
			/* ======================== 商品详情对话框 ======================== */
			// 显示隐藏
			commodityDetailDV: false,
			// 详情
			commodityDetail: {},
			/* ======================== 添加商品对话框 ======================== */
			// 显示隐藏
			commodityAddDV: false,
			// 表单
			commodityAddForm: {
				name: '',
				pt: '',
				typeName: '',
				path: '',
				video: '',
				price: '',
				yhq: '',
				yj: ''
			},
			// 表单校验规则
			commodityAddRules: {
				name: [{ required: true, message: '请输入名称', trigger: ['blur', 'change'] }],
				pt: [{ required: true, message: '请选择平台', trigger: ['blur', 'change'] }],
				typeName: [{ required: true, message: '请选择分类', trigger: ['blur', 'change'] }],
				video: [{ required: true, message: '请输入链接', trigger: ['blur', 'change'] }],
				price: [{ required: true, message: '请输入价格', trigger: ['blur', 'change'] }],
				yhq: [{ required: true, message: '请输入优惠券', trigger: ['blur', 'change'] }],
				yj: [{ required: true, message: '请输入佣金比例', trigger: ['blur', 'change'] }]
			},
			/* ======================== 编辑商品对话框 ======================== */
			// 显示隐藏
			commodityEditDV: false,
			// 表单
			commodityEditForm: {
				id: '',
				name: '',
				pt: '',
				typeName: '',
				path: '',
				video: '',
				price: '',
				yhq: '',
				yj: ''
			},
			// 表单校验规则
			commodityEditRules: {
				name: [{ required: true, message: '请输入名称', trigger: ['blur', 'change'] }],
				pt: [{ required: true, message: '请选择平台', trigger: ['blur', 'change'] }],
				typeName: [{ required: true, message: '请选择分类', trigger: ['blur', 'change'] }],
				video: [{ required: true, message: '请输入链接', trigger: ['blur', 'change'] }],
				price: [{ required: true, message: '请输入价格', trigger: ['blur', 'change'] }],
				yhq: [{ required: true, message: '请输入优惠券', trigger: ['blur', 'change'] }],
				yj: [{ required: true, message: '请输入佣金比例', trigger: ['blur', 'change'] }]
			}
		};
	},
	computed: {
		// 商品分类
		commodityClassify() {
			return this.$store.state.commodityClassify || [];
		},
		// 商品列表搜索条件
		searchData() {
			return {
				name: this.search.name,
				pt: this.search.platform,
				type: this.search.classify,
				page: this.commodityListPage.currentPage
			};
		}
	},
	methods: {
		/* ======================== 商品 ======================== */
		// 获取商品列表
		getCommodityList() {
			commodity
				.fetchCommodityList(this.searchData)
				.then(res => {
					if (res.code === 200) {
						this.commodityList = res.list.list; // 商品列表
						let { totalCount: total, pageSize, totalPage, currPage: currentPage } = res.list;
						this.commodityListPage = { total, pageSize, totalPage, currentPage }; // 商品列表分页
					} else {
						this.$message.warning(res.msg);
					}
				})
				.catch(() => {});
		},
		// 搜索商品
		searchCommodity() {
			if (!this.search.name && !this.search.platform && !this.search.classify && !this.search.status) {
				this.$message.warning('搜索条件不能为空');
				return false;
			}

			this.getCommodityList(); // 获取商品列表
		},
		// 选择商品
		commoditySelect(e) {
			this.commoditySelected = e;
		},
		// 商品列表当前页切换
		commodityListCurrentChange(currentPage) {
			this.missionListPage.currentPage = currentPage;
			this.getCommodityList(); // 获取商品列表
		},
		// 查看商品详情
		viewCommodityDetail(e) {
			this.commodityDetailDV = true;
			this.commodityDetail = e;
		},
		// 编辑商品
		commodityEdit(e) {
			this.commodityEditDV = true; // 编辑商品对话框 显示
			this.commodityEditForm = e;
		},
		// 删除商品
		commodityDelete(e) {
			this.$confirm('确认删除？', '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					let data = { ids: [e.id] };
					commodity
						.handleCommodityDelete(data)
						.then(res => {
							if (res.code === 200) {
								this.$message.success('删除宝贝成功');
								this.getCommodityList(); // 获取商品列表
							} else {
								this.$message.warning(res.msg);
							}
						})
						.catch(() => {});
				})
				.catch(() => {});
		},
		// 批量删除商品
		commodityBatchDelete() {
			if (this.commoditySelected.length === 0) {
				this.$message.warning('请选择至少一项');
				return false;
			}

			this.$confirm('确认删除？', '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					let data = { ids: [] };
					this.commoditySelected.forEach(e => {
						data.ids.push(e.id);
					});
					commodity
						.handleCommodityDelete(data)
						.then(res => {
							if (res.code === 200) {
								this.$message.success('删除宝贝成功');
								this.getCommodityList(); // 获取商品列表
							} else {
								this.$message.warning(res.msg);
							}
						})
						.catch(() => {});
				})
				.catch(() => {});
		},
		/* ======================== 添加商品对话框 ======================== */
		// 上传商品图片
		addCommodityImg(res) {
			this.commodityAddForm.path = res.msg;
		},
		// 确认添加
		submitCAF() {
			this.$refs['commodityAddFormRef'].validate(valid => {
				if (valid) {
					let data = {
						name: this.commodityAddForm.name,
						pt: this.commodityAddForm.pt,
						type: this.commodityAddForm.typeName,
						path: this.commodityAddForm.path,
						video: this.commodityAddForm.video,
						price: this.commodityAddForm.price,
						yhq: this.commodityAddForm.yhq,
						yj: this.commodityAddForm.yj
					};
					commodity
						.handleCommodityAdd(data)
						.then(res => {
							if (res.code === 200) {
								this.commodityAddDV = false; // 添加商品对话框 隐藏
								this.$message.success('添加宝贝成功');
								this.commodityAddForm.path = null;
								this.$refs['commodityAddFormRef'].resetFields();
								this.getCommodityList(); // 获取商品列表
							} else {
								this.$message.warning(res.msg);
							}
						})
						.catch(() => {});
				}
			});
		},
		// 重置
		resetCAF() {
			this.commodityAddForm.path = null;
			this.$refs['commodityAddFormRef'].resetFields();
			this.$message.success('输入信息已重置');
		},
		// 关闭
		cADClose(done) {
			this.$confirm('确认关闭？', '提示', {
				confirmButtonText: '关闭',
				cancelButtonText: '取消',
				type: 'info'
			})
				.then(() => {
					this.commodityAddForm.path = null;
					this.$refs['commodityAddFormRef'].resetFields();
					done();
				})
				.catch(() => {});
		},
		/* ======================== 编辑商品对话框 ======================== */
		// 上传商品图片
		editCommodityImg(res) {
			this.commodityEditForm.path = res.msg;
		},
		// 确认修改
		submitCEF() {
			this.$refs['commodityEditFormRef'].validate(valid => {
				if (valid) {
					let data = {
						id: this.commodityEditForm.id,
						name: this.commodityEditForm.name,
						pt: this.commodityEditForm.pt,
						type: this.commodityEditForm.typeName,
						path: this.commodityEditForm.path,
						video: this.commodityEditForm.video,
						price: this.commodityEditForm.price,
						yhq: this.commodityEditForm.yhq,
						yj: this.commodityEditForm.yj
					};
					commodity
						.handleCommodityEdit(data)
						.then(res => {
							if (res.code === 200) {
								this.commodityEditDV = false; // 编辑商品对话框 隐藏
								this.$message.success('宝贝信息修改成功');
								this.commodityEditForm.path = null;
								this.$refs['commodityEditFormRef'].resetFields();
								this.getCommodityList(); // 获取商品列表
							} else {
								this.$message.warning(res.msg);
							}
						})
						.catch(() => {});
				}
			});
		},
		// 重置
		resetCEF() {
			this.commodityEditForm.path = null;
			this.$refs['commodityEditFormRef'].resetFields();
			this.$message.success('输入信息已重置');
		},
		// 关闭
		cEDClose(done) {
			this.$confirm('确认关闭？', '提示', {
				confirmButtonText: '关闭',
				cancelButtonText: '取消',
				type: 'info'
			})
				.then(() => {
					this.commodityEditForm.path = null;
					this.$refs['commodityEditFormRef'].resetFields();
					done();
				})
				.catch(() => {});
		}
	},
	created() {
		this.getCommodityList(); // 获取商品列表
	}
};
</script>
