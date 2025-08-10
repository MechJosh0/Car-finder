<script setup lang="ts">
import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useVueTable,
  createColumnHelper,
  type PaginationState,
} from "@tanstack/vue-table";
import { ref } from "vue";
import useCars from "~/composables/useCars";
import type { Car } from "~/types/api";

const INITIAL_PAGE_INDEX = 0;
const INITIAL_PAGE_SIZE = 25;

const pagination = ref<PaginationState>({
  pageIndex: INITIAL_PAGE_INDEX,
  pageSize: INITIAL_PAGE_SIZE,
});

const { data: cars, isLoading, isError, error } = useCars(pagination);
const columnHelper = createColumnHelper<Car>();
const goToPageNumber = ref(INITIAL_PAGE_INDEX + 1);
const pageSizes = [25, 50, 100, 1000, 5000];

const columns = [columnHelper.accessor("make", { header: "Name" })];

const table = useVueTable({
  get data() {
    return cars.value?.data ?? [];
  },
  get pageCount() {
    return cars.value?.pagination?.totalPages ?? -1;
  },
  columns,
  state: {
    pagination: pagination.value,
  },
  onPaginationChange: (updater) => {
    if (typeof updater === "function") {
      setPagination(
        updater({
          pageIndex: pagination.value.pageIndex,
          pageSize: pagination.value.pageSize,
        }),
      );
    } else {
      setPagination(updater);
    }
  },
  manualPagination: true,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});

function setPagination({
  pageIndex,
  pageSize,
}: PaginationState): PaginationState {
  pagination.value.pageIndex = pageIndex;
  pagination.value.pageSize = pageSize;
  return { pageIndex, pageSize };
}

function handleGoToPage(e: any) {
  const page = e.target.value ? Number(e.target.value) - 1 : 0;
  goToPageNumber.value = page + 1;
  table.setPageIndex(page);
}

function handlePageSizeChange(e: any) {
  table.setPageSize(Number(e.target.value));
}
</script>

<template>
  <div>
    <div v-if="isLoading">Loading cars...</div>
    <div v-else-if="isError">An error occurred: {{ error?.message }}</div>
    <div v-else-if="cars?.data">
      <table>
        <thead>
          <tr
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              :colSpan="header.colSpan"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in table.getRowModel().rows" :key="row.id">
            <td v-for="cell in row.getVisibleCells()" :key="cell.id">
              <NuxtLink
                :to="{ name: 'cars-id', params: { id: cell.row.original.id } }"
              >
                {{ cell.row.original.make }}
              </NuxtLink>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr
            v-for="footerGroup in table.getFooterGroups()"
            :key="footerGroup.id"
          >
            <th
              v-for="header in footerGroup.headers"
              :key="header.id"
              :colSpan="header.colSpan"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.footer"
                :props="header.getContext()"
              />
            </th>
          </tr>
        </tfoot>
      </table>
      <div>
        <div class="flex items-center gap-2">
          <button
            class="rounded border p-1"
            @click="() => table.setPageIndex(0)"
            :disabled="!table.getCanPreviousPage()"
          >
            «
          </button>
          <button
            class="rounded border p-1"
            @click="() => table.previousPage()"
            :disabled="!table.getCanPreviousPage()"
          >
            ‹
          </button>
          <button
            class="rounded border p-1"
            @click="() => table.nextPage()"
            :disabled="!table.getCanNextPage()"
          >
            ›
          </button>
          <button
            class="rounded border p-1"
            @click="() => table.setPageIndex(table.getPageCount() - 1)"
            :disabled="!table.getCanNextPage()"
          >
            »
          </button>
          <span class="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {{ table.getState().pagination.pageIndex + 1 }} of
              {{ table.getPageCount() }}
            </strong>
          </span>
          <span class="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              :value="goToPageNumber"
              @change="handleGoToPage"
              class="w-16 rounded border p-1"
            />
          </span>
          <select
            :value="table.getState().pagination.pageSize"
            @change="handlePageSizeChange"
          >
            <option
              :key="pageSize"
              :value="pageSize"
              v-for="pageSize in pageSizes"
            >
              Show {{ pageSize }}
            </option>
          </select>
        </div>
        <div>{{ table.getRowModel().rows.length }} Rows</div>
        <pre>{{ JSON.stringify(table.getState().pagination, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>
