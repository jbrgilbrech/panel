@extends('layouts.admin')

@section('title')
    List Servers
@endsection

@section('content-header')
    <h1>Servers<small>All servers available on the system.</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">Admin</a></li>
        <li class="active">Servers</li>
    </ol>
@endsection

@section('content')
@php
    $rows = [];
    foreach ($servers as $server) {
        $rows[] = [
            'actionUrl' => '/server/' . $server->uuidShort,
            'connection' => $server->allocation->alias . ':' . $server->allocation->port,
            'name' => $server->name,
            'node' => [
                'name' => $server->node->name,
                'url' => route('admin.nodes.view', $server->node->id),
            ],
            'owner' => [
                'url' => route('admin.users.view', $server->user->id),
                'username' => $server->user->username,
            ],
            'status' => $server->isSuspended() ? 'suspended' : (! $server->isInstalled() ? 'installing' : 'active'),
            'uuid' => $server->uuid,
            'uuidShort' => $server->uuidShort,
            'viewUrl' => route('admin.servers.view', $server->id),
        ];
    }

    $pageData = [
        'createUrl' => route('admin.servers.new'),
        'paginationHtml' => $servers->hasPages() ? $servers->appends(['filter' => Request::input('filter')])->render() : null,
        'rows' => $rows,
        'search' => request()->input()['filter']['*'] ?? '',
    ];
@endphp
<div
    id="admin-page-root"
    data-page="servers-index"
    data-props='@json($pageData)'
></div>
@endsection

@section('footer-scripts')
    @parent
    <script>
        $('.console-popout').on('click', function (event) {
            event.preventDefault();
            window.open($(this).attr('href'), 'Pterodactyl Console', 'width=800,height=400');
        });
    </script>
@endsection
